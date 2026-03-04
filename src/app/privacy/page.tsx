import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Skillza',
  description: 'How Skillza collects, uses and protects your personal information in accordance with POPIA.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5efe3]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
        <Link href="/" className="font-['Bebas_Neue'] text-xl tracking-widest">
          Skill<span className="text-[#ff4a1c]">za</span>
        </Link>
        <Link
          href="/"
          className="text-sm text-white/50 hover:text-white transition-colors"
        >
          ← Back to home
        </Link>
      </nav>

      {/* Content */}
      <main className="max-w-[720px] mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold tracking-[2px] uppercase text-[#ff4a1c] bg-[#ff4a1c]/10 border border-[#ff4a1c]/20 rounded-full px-3.5 py-1 mb-4">
            Legal
          </span>
          <h1 className="font-['Bebas_Neue'] text-[clamp(40px,8vw,64px)] tracking-widest leading-none mb-3">
            Privacy Policy
          </h1>
          <div className="flex gap-4 flex-wrap text-xs text-white/40 mb-6">
            <span>📅 Effective: 2 March 2026</span>
            <span>🔄 Last updated: 2 March 2026</span>
          </div>
          <div className="text-sm text-white/70 leading-relaxed bg-white/5 border border-white/10 rounded-xl p-5">
            Skillza is committed to protecting your personal information in accordance with the{' '}
            <strong className="text-white">
              Protection of Personal Information Act 4 of 2013 (POPIA)
            </strong>{' '}
            and all applicable South African data protection laws. This Privacy Policy explains how we
            collect, use, store, and protect your information when you use the Skillza platform.
          </div>
        </div>

        <hr className="border-white/10 my-7" />

        <Section title="1. Who We Are">
          <p>
            Skillza is a South African student talent marketplace that connects university students offering
            services with clients seeking affordable, verified creative and professional talent. We act as
            the responsible party for personal information collected through our platform.
          </p>
          <HighlightBox>
            📧 Contact:{' '}
            <a href="mailto:hello@skillza.co.za" className="text-[#ff4a1c]">
              hello@skillza.co.za
            </a>
          </HighlightBox>
        </Section>

        <Section title="2. What Information We Collect">
          <SubHeading>From Clients (people booking students)</SubHeading>
          <List items={['Full name', 'WhatsApp number', 'Email address', 'Description of services requested', 'Booking reference numbers']} />
          <SubHeading>From Students (people listing their services)</SubHeading>
          <List items={[
            'Full name',
            'Email address and WhatsApp number',
            'Student number (for verification only)',
            'University student card photo',
            'University, year of study, and faculty',
            'Bio, portfolio links, and pricing information',
            'City and general availability',
          ]} />
        </Section>

        <Section title="3. Why We Collect This Information">
          <p>We collect and process personal information for the following legitimate purposes:</p>
          <List items={[
            'To verify that students are currently enrolled at a recognised South African university',
            'To create and display student profiles on the Skillza platform',
            'To facilitate bookings and connect clients with students',
            'To send booking confirmations and reference numbers',
            'To communicate with you about your listing or booking',
            'To improve our platform and services',
            'To comply with our legal obligations',
          ]} />
          <p>We will never use your information for purposes incompatible with the above without your explicit consent.</p>
        </Section>

        <Section title="4. How We Store Your Information">
          <p>Your information is stored in the following systems:</p>
          <List items={[
            'Google Forms and Google Sheets — for student onboarding and CRM',
            'Formspree — for booking request submissions',
            'Email (Gmail) — for booking notifications',
          ]} />
          <p>
            All systems are password protected and access is restricted to authorised Skillza team members
            only. We do not use unsecured spreadsheets, public folders, or unencrypted storage for personal data.
          </p>
        </Section>

        <Section title="5. Who Can See Your Information">
          <p>We do not sell, trade, or share your personal information with third parties except:</p>
          <List items={[
            'Service providers who process data on our behalf (Google, Formspree) — under their respective privacy policies',
            'Where required by South African law or a court order',
            'With your explicit consent',
          ]} />
          <HighlightBox>
            Student profiles displayed on the Skillza website are intentionally public — name, skill,
            university, bio, portfolio, and pricing. If you are a student and wish to remove your profile,
            contact us at{' '}
            <a href="mailto:hello@skillza.co.za" className="text-[#ff4a1c]">
              hello@skillza.co.za
            </a>
            .
          </HighlightBox>
        </Section>

        <Section title="6. Student Card Information">
          <p>
            Student card photos are collected solely for the purpose of verifying current university
            enrolment. They are:
          </p>
          <List items={[
            'Stored securely in a private Google Drive folder accessible only to Skillza staff',
            'Never displayed publicly on the platform',
            'Never shared with clients or third parties',
            'Deleted upon request or when no longer needed for verification',
          ]} />
        </Section>

        <Section title="7. Retention of Information">
          <List items={[
            'Student profile information: retained while your profile is active on the platform',
            'Booking requests: retained for 12 months for record-keeping purposes',
            'Student card photos: retained for the duration of your active listing, then deleted',
            'Waitlist entries: retained until the platform launches in your area or until you request deletion',
          ]} />
        </Section>

        <Section title="8. Your Rights Under POPIA">
          <p>As a data subject under POPIA, you have the right to:</p>
          <List items={[
            'Access the personal information we hold about you',
            'Request correction of inaccurate information',
            'Request deletion of your information',
            'Object to the processing of your information',
            'Lodge a complaint with the Information Regulator of South Africa',
          ]} />
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:hello@skillza.co.za" className="text-[#ff4a1c]">
              hello@skillza.co.za
            </a>
            . We will respond within 30 days.
          </p>
          <HighlightBox>
            The Information Regulator of South Africa can be contacted at:{' '}
            <a href="mailto:inforeg@justice.gov.za" className="text-[#ff4a1c]">
              inforeg@justice.gov.za
            </a>
          </HighlightBox>
        </Section>

        <Section title="9. Cookies and Tracking">
          <p>
            Our current website does not use tracking cookies, advertising cookies, or third-party analytics
            scripts. We may introduce basic analytics in future and will update this policy accordingly.
          </p>
        </Section>

        <Section title="10. Children and Minors">
          <p>
            Our platform is intended for university students who are 18 years of age or older. We do not
            knowingly collect personal information from persons under 18. If you believe we have
            inadvertently collected information from a minor, contact us immediately at{' '}
            <a href="mailto:hello@skillza.co.za" className="text-[#ff4a1c]">
              hello@skillza.co.za
            </a>
            .
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. We will notify active users of material
            changes via email. Continued use of the platform after changes constitutes acceptance of the
            updated policy.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <List items={[
            'Email: hello@skillza.co.za',
            'Website: skillza.co.za',
          ]} />
        </Section>

        {/* Footer nav */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
          <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors">
            ← Back to home
          </Link>
          <Link href="/terms" className="text-sm text-[#ff4a1c] hover:opacity-70 transition-opacity">
            Terms of Service →
          </Link>
        </div>
      </main>
    </div>
  )
}

/* ── Reusable sub-components ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-base font-bold text-white mb-3 pb-2 border-b border-white/10">{title}</h2>
      <div className="space-y-3 text-sm text-white/70 leading-relaxed">{children}</div>
    </section>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-bold text-[#ff4a1c] uppercase tracking-wider mt-4 mb-2">
      {children}
    </h3>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="my-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-5 py-1 text-sm text-white/70 leading-relaxed border-b border-white/[0.04] last:border-b-0"
        >
          <span className="absolute left-0 top-[7px] text-[#ff4a1c] text-[10px]">→</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#ff4a1c]/[0.06] border border-[#ff4a1c]/15 rounded-xl p-4 my-4 text-sm text-white/80 leading-relaxed">
      {children}
    </div>
  )
}
