import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — Skillza',
  description: 'Terms and conditions for using the Skillza student talent marketplace.',
}

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <div className="flex gap-4 flex-wrap text-xs text-white/40 mb-6">
            <span>📅 Effective: 2 March 2026</span>
            <span>🔄 Last updated: 2 March 2026</span>
          </div>
          <div className="text-sm text-white/70 leading-relaxed bg-white/5 border border-white/10 rounded-xl p-5">
            Please read these Terms of Service carefully before using the Skillza platform. By using
            Skillza, you agree to be bound by these terms. If you do not agree, do not use our platform.
          </div>
        </div>

        <hr className="border-white/10 my-7" />

        <Section title="1. About Skillza">
          <p>
            Skillza is an online marketplace that connects South African university students
            (&ldquo;Students&rdquo;) offering creative and professional services with individuals and
            businesses (&ldquo;Clients&rdquo;) seeking those services.
          </p>
          <WarningBox>
            ⚠️ <strong className="text-white">Important:</strong> Skillza is a platform — we are not an
            employer, agency, or service provider. We do not perform, supervise, or guarantee any services
            listed on the platform.
          </WarningBox>
        </Section>

        <Section title="2. Eligibility">
          <SubHeading>To register as a Student, you must:</SubHeading>
          <List items={[
            'Be currently enrolled at a recognised South African university',
            'Be 18 years of age or older',
            'Hold a valid student card from your institution',
            'Have your profile manually approved by Skillza before going live',
          ]} />
          <SubHeading>To use Skillza as a Client, you must:</SubHeading>
          <List items={[
            'Be 18 years of age or older, or have parental consent',
            'Provide accurate contact information',
            'Use the platform only for lawful purposes',
          ]} />
        </Section>

        <Section title="3. What Skillza Provides">
          <SubHeading>We provide:</SubHeading>
          <List items={[
            'A platform to discover and contact verified student talent',
            'Student Card verification to confirm university enrolment',
            'Booking request facilitation and reference number generation',
            'A deposit framework to protect both parties',
          ]} />
          <SubHeading>We do not provide:</SubHeading>
          <List items={[
            'Any guarantee of the quality, timeliness, or outcome of any service',
            'Supervision of any booking, meeting, or job',
            'Insurance, liability cover, or dispute resolution services',
            'Employment, contractor, or agency relationships with Students',
          ]} />
        </Section>

        <Section title="4. The Booking Process">
          <p>All bookings facilitated through Skillza operate as follows:</p>
          <List items={[
            'Clients submit a booking request through the platform',
            'Skillza forwards the request to the relevant Student',
            'The Student has 24 hours to confirm or decline availability',
            'If confirmed, Client and Student communicate directly via WhatsApp to agree on scope and final pricing',
            'A 30% deposit is paid by the Client before work begins',
            'The remaining 70% balance is paid directly to the Student upon satisfactory completion',
          ]} />
          <HighlightBox>
            Skillza is not a party to any agreement between a Client and a Student. The agreement is
            solely between the Client and the Student.
          </HighlightBox>
        </Section>

        <Section title="5. Payment and Deposits">
          <p>
            In Phase 1 of our platform, payments are made directly between Clients and Students via EFT or
            SnapScan. Skillza does not process, hold, or guarantee any payments at this stage.
          </p>
          <List items={[
            'The 30% deposit is paid before any work begins',
            'The deposit is non-refundable if the Client cancels after work has commenced',
            'The balance is payable upon satisfactory delivery of the agreed service',
            'Any disputes regarding payment are between the Client and the Student directly',
          ]} />
          <p>
            Skillza accepts no liability for any payment disputes, fraud, non-payment, or financial loss
            arising from transactions between Clients and Students.
          </p>
        </Section>

        <Section title="6. Safety and Conduct">
          <p>All users agree to:</p>
          <List items={[
            'Treat all other users with respect and professionalism',
            'Meet in safe, public, or professional spaces for first-time in-person jobs',
            'Never use the platform to solicit or engage in any illegal activity',
            'Report any suspicious, threatening, or inappropriate behaviour to hello@skillza.co.za immediately',
          ]} />
          <WarningBox>
            ⚠️ Skillza verifies student enrolment but does not conduct criminal background checks on
            Students or Clients. Users are responsible for exercising their own judgment and due diligence
            before meeting in person or engaging services.
          </WarningBox>
        </Section>

        <Section title="7. Student Responsibilities">
          <p>By listing on Skillza, Students agree to:</p>
          <List items={[
            'Provide accurate information about their skills, qualifications, and pricing',
            'Respond to booking requests within 24 hours',
            'Deliver services to the standard and scope agreed with the Client',
            'Behave professionally at all times',
            'Notify Skillza if they are no longer enrolled at their university',
            'Not engage in any conduct that could damage the reputation of Skillza',
          ]} />
        </Section>

        <Section title="8. Client Responsibilities">
          <p>By making a booking through Skillza, Clients agree to:</p>
          <List items={[
            'Provide a clear and accurate brief for the services required',
            'Pay the agreed deposit before work begins',
            'Pay the balance upon satisfactory completion',
            'Treat Students with respect and professionalism',
            'Not use booking requests to collect student contact details for purposes other than the stated booking',
          ]} />
        </Section>

        <Section title="9. Limitation of Liability">
          <p>To the fullest extent permitted by South African law:</p>
          <List items={[
            'Skillza is not liable for any loss, damage, injury, or harm arising from any booking made through the platform',
            'Skillza is not responsible for the conduct, quality, or reliability of any Student or Client',
            'Skillza is not liable for any payment disputes, fraudulent transactions, or financial loss',
            'Our total liability, if any, is limited to the platform fee paid (currently R0 in Phase 1)',
          ]} />
        </Section>

        <Section title="10. Intellectual Property">
          <p>
            The Skillza name, logo, and platform design are the intellectual property of Skillza. Students
            retain ownership of their own creative work and portfolio content. By listing on Skillza,
            Students grant Skillza a non-exclusive licence to display their profile and portfolio content on
            the platform for the purpose of facilitating bookings.
          </p>
        </Section>

        <Section title="11. Termination">
          <p>Skillza reserves the right to:</p>
          <List items={[
            'Remove any student profile that violates these terms or our community standards',
            'Suspend or terminate access for any user who engages in fraudulent, abusive, or illegal behaviour',
            'Remove any content that is false, misleading, or harmful',
          ]} />
          <p>
            Students may request removal of their profile at any time by contacting{' '}
            <a href="mailto:hello@skillza.co.za" className="text-[#ff4a1c]">
              hello@skillza.co.za
            </a>
            .
          </p>
        </Section>

        <Section title="12. Governing Law">
          <p>
            These Terms of Service are governed by the laws of the Republic of South Africa. Any disputes
            arising from use of the Skillza platform shall be subject to the jurisdiction of the South
            African courts.
          </p>
        </Section>

        <Section title="13. Changes to These Terms">
          <p>
            We may update these Terms of Service from time to time. We will notify registered users of
            material changes via email. Continued use of the platform after changes are posted constitutes
            acceptance of the updated terms.
          </p>
        </Section>

        <Section title="14. Contact Us">
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
          <Link href="/privacy" className="text-sm text-[#ff4a1c] hover:opacity-70 transition-opacity">
            Privacy Policy →
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

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#d4a853]/[0.06] border border-[#d4a853]/20 rounded-xl p-4 my-4 text-sm text-white/80 leading-relaxed">
      {children}
    </div>
  )
}
