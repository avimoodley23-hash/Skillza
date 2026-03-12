'use client'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// Each pill mirrors a brand accent card from the site
const SUGGESTIONS = [
  { text: 'Find me a photographer',  bg: '#334ED8', color: '#fff' },
  { text: 'How does booking work?',  bg: '#FF7144', color: '#fff' },
  { text: 'What does it cost?',      bg: '#E0E446', color: '#111110' },
  { text: 'Help me write my bio',    bg: '#C0F0AA', color: '#111110' },
]

// Parse [text](url) markdown into <a> elements; everything else is plain text
function renderContent(text: string, isUser: boolean) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (match) {
      return (
        <a
          key={i}
          href={match[2]}
          style={{
            color: isUser ? '#fff' : '#334ED8',
            textDecoration: 'underline',
            fontWeight: 700,
            textUnderlineOffset: 2,
          }}
        >
          {match[1]}
        </a>
      )
    }
    return <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>
  })
}

// Small logo mark reused in avatar spots
const Logo = ({ size = 28 }: { size?: number }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.3,
    background: '#C7B0FF',
    border: '1.5px solid rgba(255,255,255,.12)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(17,17,16,.25)',
  }}>
    <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: size * 0.48, letterSpacing: 0.5 }}>
      <span style={{ color: '#000000' }}>S</span>
      <span style={{ color: '#334ED8' }}>Z</span>
    </span>
  </div>
)

// "SKILL" white · "ZA" electric blue · optional suffix muted
const Brand = ({ suffix = '', suffixOpacity = 0.5, size = 20 }: { suffix?: string; suffixOpacity?: number; size?: number }) => (
  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: size, letterSpacing: size * 0.125, lineHeight: 1 }}>
    <span style={{ color: '#000000' }}>SKILL</span>
    <span style={{ color: '#334ED8' }}>ZA</span>
    {suffix && <span style={{ color: `rgba(250,250,246,${suffixOpacity})` }}>{suffix}</span>}
  </span>
)

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text: string) => {
    if (!text.trim() || loading) return
    setShowSuggestions(false)
    const userMsg: Message = { role: 'user', content: text.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.text || 'Something went wrong — try again.' }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Connection error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
  }

  return (
    <>
      {/* ── Chat window ───────────────────────────────────────────── */}
      {open && (
        <div className="skz-chat-window" style={{
          position: 'fixed',
          bottom: 84,
          right: 20,
          zIndex: 9999,
          width: 'min(390px, calc(100vw - 32px))',
          height: 'min(570px, calc(100svh - 112px))',
          background: '#FAFAF6',
          border: '1px solid rgba(0,0,0,.10)',
          borderRadius: 22,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 64px rgba(17,17,16,.22), 0 4px 16px rgba(17,17,16,.08)',
          animation: 'skzChatUp .3s cubic-bezier(.16,1,.3,1)',
          overflow: 'hidden',
        }}>

          {/* ── Header: grape-purple with site-palette blob circles ── */}
          <div style={{
            background: '#C7B0FF',
            padding: '16px 16px 14px',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}>


            {/* Content row */}
            <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                <Logo size={38} />
                <div>
                  <Brand suffix=" BOT" suffixOpacity={0.45} size={21} />
                  <div style={{
                    fontSize: 10,
                    color: 'rgba(250,250,246,.45)',
                    marginTop: 3,
                    fontFamily: 'Instrument Sans, sans-serif',
                    letterSpacing: .4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#0841dc',
                      display: 'inline-block',
                      boxShadow: '0 0 6px rgba(13, 55, 220, 0.9)',
                      animation: 'skzPulse 2s ease-in-out infinite',
                    }} />
                    Online · SA student talent
                  </div>
                </div>
              </div>

              <div style={{ display:'flex', gap:7, alignItems:'center' }}>
                {messages.length > 0 && (
                  <button
                    onClick={() => { setMessages([]); setShowSuggestions(true) }}
                    style={{
                      fontSize: 11, fontWeight: 700,
                      color: 'rgba(250,250,246,.6)',
                      background: 'rgba(250,250,246,.08)',
                      border: '1px solid rgba(250,250,246,.14)',
                      borderRadius: 6, padding: '4px 10px',
                      cursor: 'pointer',
                      fontFamily: 'Instrument Sans, sans-serif',
                      letterSpacing: .3,
                    }}
                  >New chat</button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'rgba(250,250,246,.08)',
                    border: '1px solid rgba(250,250,246,.14)',
                    color: 'rgba(250,250,246,.7)',
                    borderRadius: 8, width: 30, height: 30,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, cursor: 'pointer', lineHeight: 1,
                    fontFamily: 'Instrument Sans, sans-serif',
                  }}
                  aria-label="Close chat"
                >×</button>
              </div>
            </div>
          </div>

          {/* ── Messages ── */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 16px 8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
            {/* Welcome message */}
            {messages.length === 0 && (
              <div style={{ display:'flex', gap:9, alignItems:'flex-start' }}>
                <Logo size={28} />
                <div style={{
                  background: '#F2F0EA',
                  border: '1px solid rgba(0,0,0,.07)',
                  borderRadius: '4px 12px 12px 12px',
                  padding: '11px 14px',
                  fontSize: 13, color: '#111110', lineHeight: 1.65,
                  maxWidth: '86%',
                  fontFamily: 'Instrument Sans, sans-serif',
                }}>
                  Hey — I'm the Skillza Bot. I can help you find the right student creative, explain how bookings work, or help students build better profiles. What do you need?
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: 9,
              }}>
                {m.role === 'assistant' && <Logo size={28} />}
                <div style={{
                  background: m.role === 'user' ? '#C7B0FF' : '#F2F0EA',
                  border: m.role === 'user' ? 'none' : '1px solid rgba(0,0,0,.07)',
                  borderRadius: m.role === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
                  padding: '11px 14px',
                  fontSize: 13,
                  color: m.role === 'user' ? '#fff' : '#111110',
                  lineHeight: 1.65,
                  maxWidth: '86%',
                  wordBreak: 'break-word',
                  fontFamily: 'Instrument Sans, sans-serif',
                  boxShadow: m.role === 'user' ? '0 2px 10px rgba(51,78,216,.3)' : 'none',
                }}>
                  {renderContent(m.content, m.role === 'user')}
                </div>
              </div>
            ))}

            {/* Typing dots */}
            {loading && (
              <div style={{ display:'flex', gap:9, alignItems:'flex-start' }}>
                <Logo size={28} />
                <div style={{
                  background: '#F2F0EA',
                  border: '1px solid rgba(0,0,0,.07)',
                  borderRadius: '4px 12px 12px 12px',
                  padding: '13px 16px',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'rgba(17,17,16,.3)',
                      animation: `skzDot 1.2s ease-in-out ${i * 0.18}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── Suggestion pills — bold solid colours like site cards ── */}
          {showSuggestions && messages.length === 0 && (
            <div style={{
              padding: '2px 14px 10px',
              display: 'flex', flexWrap: 'wrap', gap: 6,
              flexShrink: 0,
            }}>
              {SUGGESTIONS.map(s => (
                <button
                  key={s.text}
                  onClick={() => send(s.text)}
                  style={{
                    background: s.bg,
                    border: 'none',
                    color: s.color,
                    borderRadius: 20,
                    padding: '6px 13px',
                    fontSize: 11, fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'Instrument Sans, sans-serif',
                    transition: 'transform .15s, box-shadow .15s',
                    letterSpacing: .2,
                    boxShadow: '0 2px 8px rgba(17,17,16,.1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 5px 14px rgba(17,17,16,.18)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(17,17,16,.1)'
                  }}
                >
                  {s.text}
                </button>
              ))}
            </div>
          )}

          {/* ── Input bar ── */}
          <div style={{
            padding: '10px 12px',
            paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
            borderTop: '1px solid rgba(0,0,0,.07)',
            background: '#FFFFFF',
            display: 'flex', gap: 8, alignItems: 'center',
            flexShrink: 0,
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything…"
              disabled={loading}
              style={{
                flex: 1,
                background: '#F2F0EA',
                border: '1px solid rgba(0,0,0,.09)',
                borderRadius: 10,
                padding: '10px 14px',
                color: '#111110', fontSize: 16,
                fontFamily: 'Instrument Sans, sans-serif',
                outline: 'none',
                transition: 'border-color .15s, box-shadow .15s',
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = 'rgba(51,78,216,.45)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(199,176,255,.25)'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'rgba(0,0,0,.09)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={loading || !input.trim()}
              style={{
                width: 38, height: 38,
                borderRadius: 10, border: 'none',
                flexShrink: 0,
                background: loading || !input.trim() ? 'rgba(51,78,216,.22)' : '#334ED8',
                color: '#fff', fontSize: 16,
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .15s',
                boxShadow: loading || !input.trim() ? 'none' : '0 3px 12px rgba(51,78,216,.4)',
              }}
              aria-label="Send"
            >↑</button>
          </div>
        </div>
      )}

      {/* ── Floating bubble ── */}
      <button
        className="skz-chat-bubble"
        onClick={() => setOpen(o => !o)}
        aria-label="Open Skillza Bot"
        style={{
          position: 'fixed',
          bottom: 20, right: 20,
          zIndex: 9999,
          height: 52,
          padding: open ? '0 18px' : '0 18px',
          borderRadius: 26,
          border: 'none',
          background: open ? '#ECEAE4' : '#C7B0FF',
          cursor: 'pointer',
          boxShadow: open
            ? '0 2px 12px rgba(17,17,16,.12)'
            : '0 4px 20px rgba(123,47,168,.45), 0 0 0 3px rgba(199,176,255,.3)',
          display: 'flex', alignItems: 'center', gap: 9,
          transition: 'all .25s cubic-bezier(.34,1.56,.64,1)',
          whiteSpace: 'nowrap',
          animation: open ? 'none' : 'skzBubbleIdle 3s ease-in-out infinite',
        }}
        onMouseEnter={e => {
          if (!open) {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.03)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(123,47,168,.55), 0 0 0 4px rgba(199,176,255,.35)'
          }
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = open
            ? '0 2px 12px rgba(17,17,16,.12)'
            : '0 4px 20px rgba(17,17,16,.35), 0 0 0 3px rgba(192,240,170,.25)'
        }}
      >
        {open ? (
          <span style={{ fontFamily:'Instrument Sans,sans-serif', fontSize:20, color:'#111110', lineHeight:1 }}>×</span>
        ) : (
          <>
            <Brand suffix=" BOT" suffixOpacity={0.5} size={15} />
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#C0F0AA', flexShrink: 0,
              boxShadow: '0 0 8px rgba(192,240,170,.9)',
              animation: 'skzPulse 2s ease-in-out infinite',
            }} />
          </>
        )}
      </button>

      <style>{`
        @keyframes skzChatUp {
          from { transform: translateY(16px) scale(.96); opacity: 0; }
          to   { transform: translateY(0)    scale(1);   opacity: 1; }
        }
        @keyframes skzDot {
          0%, 60%, 100% { transform: translateY(0);   opacity: .35; }
          30%            { transform: translateY(-4px); opacity: 1;   }
        }
        @keyframes skzPulse {
          0%, 100% { opacity: 1;  transform: scale(1);   }
          50%      { opacity: .6; transform: scale(.82); }
        }
        @keyframes skzBubbleIdle {
          0%, 100% { box-shadow: 0 4px 20px rgba(17,17,16,.35), 0 0 0 3px rgba(10, 6, 255, 0.25); }
          50%      { box-shadow: 0 4px 24px rgba(17,17,16,.4),  0 0 0 5px rgba(3, 3, 255, 0.32); }
        }
        /* ── Mobile: lift bubble above sticky booking bar ── */
        @media (max-width: 767px) {
          .skz-chat-bubble {
            bottom: 90px !important;
            right: 12px !important;
          }
          .skz-chat-window {
            bottom: 150px !important;
            right: 8px !important;
            left: 8px !important;
            width: calc(100vw - 16px) !important;
            height: min(480px, calc(100svh - 180px)) !important;
          }
        }
      `}</style>
    </>
  )
}
