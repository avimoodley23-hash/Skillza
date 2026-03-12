import { NextResponse } from 'next/server'

const MODEL = 'gemini-2.0-flash'
const BASE = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

async function callGemini(prompt: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY
  if (!key) throw new Error('GEMINI_API_KEY is not configured')

  const res = await fetch(`${BASE}?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action } = body

    // ── 1. Bio writer ──────────────────────────────────────────────────────────
    if (action === 'bio') {
      const { bullets, name, skill, university, year } = body
      if (!bullets?.trim()) {
        return NextResponse.json({ error: 'bullets is required' }, { status: 400 })
      }
      const prompt = `Write a short, confident 3–4 sentence profile bio for a student creative on a platform called Skillza. Here are the details:
- Name: ${name ?? 'unknown'}
- Skill: ${skill ?? 'creative work'}
- University: ${university ?? 'university'}
- Year: ${year ?? 'student'}
- Their notes about themselves: ${bullets}

Rules:
• Write in first person
• Professional but warm tone — no buzzwords or clichés
• Mention what makes them different or what they enjoy about their work
• End with something that invites clients to book
• Output ONLY the final bio text, nothing else`

      const text = await callGemini(prompt)
      return NextResponse.json({ text: text.trim() })
    }

    // ── 2. Review summariser ───────────────────────────────────────────────────
    if (action === 'summarize_reviews') {
      const { reviews } = body
      if (!Array.isArray(reviews) || reviews.length === 0) {
        return NextResponse.json({ error: 'reviews array is required' }, { status: 400 })
      }
      const reviewLines = reviews
        .map((r: { stars: number; text: string }) => `${r.stars}/5 stars: "${r.text}"`)
        .join('\n')
      const prompt = `Summarise these client reviews into ONE punchy sentence (max 18 words) that captures what clients love most. Be specific, not generic. No quotes around the output.

Reviews:
${reviewLines}

Output ONLY the summary sentence.`

      const text = await callGemini(prompt)
      return NextResponse.json({ text: text.trim().replace(/^["']|["']$/g, '') })
    }

    // ── 3. WhatsApp draft ──────────────────────────────────────────────────────
    if (action === 'whatsapp_draft') {
      const { studentName, clientName, description } = body
      const prompt = `Draft a short, friendly opening WhatsApp message from a client to a student creative they just booked on Skillza. Keep it natural and conversational, under 50 words, no emojis.

Client name: ${clientName ?? 'the client'}
Student name: ${studentName ?? 'the student'}
What the client needs: ${description?.trim() || 'not specified — just a friendly intro'}

Output ONLY the message text, nothing else.`

      const text = await callGemini(prompt)
      return NextResponse.json({ text: text.trim() })
    }

    // ── 4. Smart category suggestion ───────────────────────────────────────────
    if (action === 'suggest_category') {
      const { description, categories } = body
      if (!description?.trim()) {
        return NextResponse.json({ error: 'description is required' }, { status: 400 })
      }
      if (!Array.isArray(categories) || categories.length === 0) {
        return NextResponse.json({ error: 'categories array is required' }, { status: 400 })
      }
      const prompt = `Based on this client brief, pick the single best matching creative service category from the list. Output ONLY the category name, exactly as written in the list.

Brief: "${description}"
Categories: ${categories.join(', ')}

Output ONLY the category name.`

      const text = await callGemini(prompt)
      const trimmed = text.trim()
      const match = categories.find(
        (c: string) => c.toLowerCase() === trimmed.toLowerCase()
      ) ?? categories.find(
        (c: string) => trimmed.toLowerCase().includes(c.toLowerCase())
      ) ?? null

      return NextResponse.json({ category: match })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown AI error'
    console.error('[Gemini route]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
