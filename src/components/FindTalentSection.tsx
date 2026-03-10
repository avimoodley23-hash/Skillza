'use client'
import { AnimateIn } from '@/components/AnimateIn'
import { SplitText } from '@/components/SplitText'
import { GraduationCap, CircleDollarSign, ShieldCheck, CircleCheck } from 'lucide-react'
import type React from 'react'

export function FindTalentSection() {
  const features: { icon: React.ElementType; title: string; body: string }[] = [
    { icon: GraduationCap, title: "Trained at SA's best creative institutions", body: "These aren't hobbyists. They spend every day studying and practising the exact skill you need." },
    { icon: CircleDollarSign, title: "Honest prices, not agency markups", body: "You pay for the skill, not a layer of account managers and overhead. Rates are set by the students themselves." },
    { icon: ShieldCheck, title: "Skillza Verified. You know who's coming.", body: "Every creative goes through our verification process before their profile goes live. Real people, real credentials, no guesswork." },
    { icon: CircleCheck, title: "Protected from the first rand", body: "A 30% deposit locks in the booking. You don't pay in full upfront, and students don't work without commitment." },
  ]

  return (
    <section style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{ padding: 'clamp(48px, 8vw, 80px) 24px', background: 'var(--black-2)' }} className="find-talent-inner">
        <AnimateIn style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="tag-pill tag-blue">Find Talent</div>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: .93, letterSpacing: 1, marginBottom: 14 }}>
            <SplitText text="Local talent." style={{ display: 'block' }} />
            <SplitText text="Affordable prices." style={{ display: 'block' }} delay={80} />
            <br />
            <span style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', color: 'var(--blue)' }}>Serious quality.</span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.8vw, 15px)', lineHeight: 1.8, color: 'var(--cream-dim)', maxWidth: 480 }}>
            Mid-degree students at UCT, AFDA, Red &amp; Yellow, Wits and ICA. Trained full-time in exactly what you need. Lower prices because they're students. The quality isn't.
          </p>
          <div style={{ marginTop: 28, background: 'var(--card)', border: '1px solid var(--border)', borderLeft: '3px solid var(--orange)', borderRadius: '0 14px 14px 0', padding: 22 }}>
            <p style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontSize: 16, lineHeight: 1.65, color: 'var(--cream)', marginBottom: 12 }}>
              "You're getting someone who trained for this, who wants to add your project to their portfolio, and who is going to show up and do their absolute best. That motivation is worth everything."
            </p>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)' }}>Why Skillza Works for Clients</p>
          </div>
        </AnimateIn>

        <AnimateIn delay={1} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {features.map(f => (
            <div key={f.title} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 9, background: 'var(--b-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)' }}>
                <f.icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{f.title}</h4>
                <p style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--cream-dim)' }}>{f.body}</p>
              </div>
            </div>
          ))}
        </AnimateIn>
      </div>

      <style>{`
        .find-talent-inner {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }
        @media (min-width: 900px) {
          .find-talent-inner {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 72px;
            align-items: center;
            padding: 80px 52px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default FindTalentSection
