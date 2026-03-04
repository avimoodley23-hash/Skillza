import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service — Skillza',
  description: 'Terms and conditions for using the Skillza student talent marketplace.',
}

export default function TermsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        :root {
          --black: #100F0D;
          --black-2: #161410;
          --cream: #F5EFE3;
          --orange: #FF4B1F;
          --o-dim: rgba(255,75,31,.12);
          --muted: #7A7469;
          --border: rgba(245,239,227,.07);
          --card: rgba(245,239,227,.03);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Instrument Sans', sans-serif;
          background: var(--black);
          color: var(--cream);
          -webkit-font-smoothing: antialiased;
        }

        .lgl-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 400;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 24px; height: 60px;
          background: rgba(16,15,13,.96);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(24px);
        }
        .lgl-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px; letter-spacing: 2px; color: var(--cream);
          text-decoration: none;
        }
        .lgl-logo em { color: var(--orange); font-style: normal; }
        .lgl-back {
          font-size: 13px; color: var(--muted); text-decoration: none; transition: color .2s;
        }
        .lgl-back:hover { color: var(--cream); }

        .lgl-wrap {
          max-width: 720px; margin: 0 auto; padding: 96px 28px 80px;
        }

        .lm-tag {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--orange); background: rgba(255,74,28,.1);
          border: 1px solid rgba(255,74,28,.2); border-radius: 100px;
          padding: 4px 14px; margin-bottom: 16px;
        }
        .lm-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 6vw, 52px);
          letter-spacing: 2px; line-height: 1; margin-bottom: 10px;
        }
        .lm-meta {
          font-size: 12px; color: var(--muted); margin-bottom: 24px;
          display: flex; gap: 16px; flex-wrap: wrap;
        }
        .lm-intro {
          font-size: 14px; color: rgba(245,239,227,.75); line-height: 1.8;
          padding: 18px 20px; background: var(--card);
          border: 1px solid var(--border); border-radius: 12px; margin-bottom: 28px;
        }
        .lm-rule { border: none; border-top: 1px solid var(--border); margin: 28px 0; }

        .lm h2 {
          font-family: 'Instrument Sans', sans-serif;
          font-size: 16px; font-weight: 700; color: var(--cream);
          margin: 32px 0 10px; padding-bottom: 8px;
          border-bottom: 1px solid var(--border);
        }
        .lm h3 {
          font-size: 13px; font-weight: 700; color: var(--orange);
          text-transform: uppercase; letter-spacing: .5px; margin: 18px 0 8px;
        }
        .lm p {
          font-size: 14px; color: rgba(245,239,227,.7);
          margin-bottom: 12px; line-height: 1.8;
        }
        .lm ul { margin: 8px 0 14px 0; padding: 0; list-style: none; }
        .lm ul li {
          font-size: 14px; color: rgba(245,239,227,.7); line-height: 1.8;
          padding: 4px 0 4px 18px; position: relative;
          border-bottom: 1px solid rgba(255,255,255,.04);
        }
        .lm ul li:last-child { border-bottom: none; }
        .lm ul li::before {
          content: '→'; position: absolute; left: 0;
          color: var(--orange); font-size: 11px; top: 6px;
        }
        .lm .hb {
          background: rgba(255,74,28,.06); border: 1px solid rgba(255,74,28,.15);
          border-radius: 10px; padding: 14px 18px; margin: 16px 0;
        }
        .lm .hb p { margin: 0; color: rgba(245,239,227,.8); }
        .lm .wb {
          background: rgba(212,168,83,.06); border: 1px solid rgba(212,168,83,.2);
          border-radius: 10px; padding: 14px 18px; margin: 16px 0;
        }
        .lm .wb p { margin: 0; color: rgba(245,239,227,.8); }
        .lm a { color: var(--orange); }

        .lgl-footer {
          margin-top: 56px; padding-top: 28px;
          border-top: 1px solid var(--border);
          display: flex; flex-wrap: wrap; gap: 16px;
          align-items: center; justify-content: space-between;
        }
        .lgl-footer a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color .2s; }
        .lgl-footer a:hover { color: var(--cream); }
        .lgl-footer a.orange { color: var(--orange); }
      `}</style>

      <nav className="lgl-nav">
        <Link href="/" className="lgl-logo">Skill<em>za</em></Link>
        <Link href="/" className="lgl-back">← Back to home</Link>
      </nav>

      <main className="lgl-wrap">
        <div className="lm">
          <div className="lm-tag">Legal</div>
          <div className="lm-title">Terms of Service</div>
          <div className="lm-meta">
            <span>📅 Effective: 2 March 2026</span>
            <span>🔄 Last updated: 2 March 2026</span>
          </div>
          <div className="lm-intro">
            Please read these Terms of Service carefully before using the Skillza platform. By using Skillza, you agree to be bound by these terms. If you do not agree, do not use our platform.
          </div>

          <hr className="lm-rule" />

          <h2>1. About Skillza</h2>
          <p>Skillza is an online marketplace that connects South African university students (&ldquo;Students&rdquo;) offering creative and professional services with individuals and businesses (&ldquo;Clients&rdquo;) seeking those services.</p>
          <div className="wb"><p>⚠️ <strong>Important:</strong> Skillza is a platform — we are not an employer, agency, or service provider. We do not perform, supervise, or guarantee any services listed on the platform.</p></div>

          <h2>2. Eligibility</h2>
          <h3>To register as a Student, you must:</h3>
          <ul>
            <li>Be currently enrolled at a recognised South African university</li>
            <li>Be 18 years of age or older</li>
            <li>Hold a valid student card from your institution</li>
            <li>Have your profile manually approved by Skillza before going live</li>
          </ul>
          <h3>To use Skillza as a Client, you must:</h3>
          <ul>
            <li>Be 18 years of age or older, or have parental consent</li>
            <li>Provide accurate contact information</li>
            <li>Use the platform only for lawful purposes</li>
          </ul>

          <h2>3. What Skillza Provides</h2>
          <h3>We provide:</h3>
          <ul>
            <li>A platform to discover and contact verified student talent</li>
            <li>Student Card verification to confirm university enrolment</li>
            <li>Booking request facilitation and reference number generation</li>
            <li>A deposit framework to protect both parties</li>
          </ul>
          <h3>We do not provide:</h3>
          <ul>
            <li>Any guarantee of the quality, timeliness, or outcome of any service</li>
            <li>Supervision of any booking, meeting, or job</li>
            <li>Insurance, liability cover, or dispute resolution services</li>
            <li>Employment, contractor, or agency relationships with Students</li>
          </ul>

          <h2>4. The Booking Process</h2>
          <p>All bookings facilitated through Skillza operate as follows:</p>
          <ul>
            <li>Clients submit a booking request through the platform</li>
            <li>Skillza forwards the request to the relevant Student</li>
            <li>The Student has 24 hours to confirm or decline availability</li>
            <li>If confirmed, Client and Student communicate directly via WhatsApp to agree on scope and final pricing</li>
            <li>A 30% deposit is paid by the Client before work begins</li>
            <li>The remaining 70% balance is paid directly to the Student upon satisfactory completion</li>
          </ul>
          <div className="hb"><p>Skillza is not a party to any agreement between a Client and a Student. The agreement is solely between the Client and the Student.</p></div>

          <h2>5. Payment and Deposits</h2>
          <p>In Phase 1 of our platform, payments are made directly between Clients and Students via EFT or SnapScan. Skillza does not process, hold, or guarantee any payments at this stage.</p>
          <ul>
            <li>The 30% deposit is paid before any work begins</li>
            <li>The deposit is non-refundable if the Client cancels after work has commenced</li>
            <li>The balance is payable upon satisfactory delivery of the agreed service</li>
            <li>Any disputes regarding payment are between the Client and the Student directly</li>
          </ul>
          <p>Skillza accepts no liability for any payment disputes, fraud, non-payment, or financial loss arising from transactions between Clients and Students.</p>

          <h2>6. Safety and Conduct</h2>
          <p>All users agree to:</p>
          <ul>
            <li>Treat all other users with respect and professionalism</li>
            <li>Meet in safe, public, or professional spaces for first-time in-person jobs</li>
            <li>Never use the platform to solicit or engage in any illegal activity</li>
            <li>Report any suspicious, threatening, or inappropriate behaviour to <a href="mailto:hello@skillza.co.za">hello@skillza.co.za</a> immediately</li>
          </ul>
          <div className="wb"><p>⚠️ Skillza verifies student enrolment but does not conduct criminal background checks on Students or Clients. Users are responsible for exercising their own judgment and due diligence before meeting in person or engaging services.</p></div>

          <h2>7. Student Responsibilities</h2>
          <p>By listing on Skillza, Students agree to:</p>
          <ul>
            <li>Provide accurate information about their skills, qualifications, and pricing</li>
            <li>Respond to booking requests within 24 hours</li>
            <li>Deliver services to the standard and scope agreed with the Client</li>
            <li>Behave professionally at all times</li>
            <li>Notify Skillza if they are no longer enrolled at their university</li>
            <li>Not engage in any conduct that could damage the reputation of Skillza</li>
          </ul>

          <h2>8. Client Responsibilities</h2>
          <p>By making a booking through Skillza, Clients agree to:</p>
          <ul>
            <li>Provide a clear and accurate brief for the services required</li>
            <li>Pay the agreed deposit before work begins</li>
            <li>Pay the balance upon satisfactory completion</li>
            <li>Treat Students with respect and professionalism</li>
            <li>Not use booking requests to collect student contact details for purposes other than the stated booking</li>
          </ul>

          <h2>9. Limitation of Liability</h2>
          <p>To the fullest extent permitted by South African law:</p>
          <ul>
            <li>Skillza is not liable for any loss, damage, injury, or harm arising from any booking made through the platform</li>
            <li>Skillza is not responsible for the conduct, quality, or reliability of any Student or Client</li>
            <li>Skillza is not liable for any payment disputes, fraudulent transactions, or financial loss</li>
            <li>Our total liability, if any, is limited to the platform fee paid (currently R0 in Phase 1)</li>
          </ul>

          <h2>10. Intellectual Property</h2>
          <p>The Skillza name, logo, and platform design are the intellectual property of Skillza. Students retain ownership of their own creative work and portfolio content. By listing on Skillza, Students grant Skillza a non-exclusive licence to display their profile and portfolio content on the platform for the purpose of facilitating bookings.</p>

          <h2>11. Termination</h2>
          <p>Skillza reserves the right to:</p>
          <ul>
            <li>Remove any student profile that violates these terms or our community standards</li>
            <li>Suspend or terminate access for any user who engages in fraudulent, abusive, or illegal behaviour</li>
            <li>Remove any content that is false, misleading, or harmful</li>
          </ul>
          <p>Students may request removal of their profile at any time by contacting <a href="mailto:hello@skillza.co.za">hello@skillza.co.za</a>.</p>

          <h2>12. Governing Law</h2>
          <p>These Terms of Service are governed by the laws of the Republic of South Africa. Any disputes arising from use of the Skillza platform shall be subject to the jurisdiction of the South African courts.</p>

          <h2>13. Changes to These Terms</h2>
          <p>We may update these Terms of Service from time to time. We will notify registered users of material changes via email. Continued use of the platform after changes are posted constitutes acceptance of the updated terms.</p>

          <h2>14. Contact Us</h2>
          <ul>
            <li>Email: <a href="mailto:hello@skillza.co.za">hello@skillza.co.za</a></li>
            <li>Website: <a href="https://skillza.co.za">skillza.co.za</a></li>
          </ul>

          <div className="lgl-footer">
            <Link href="/" className="">← Back to home</Link>
            <Link href="/privacy" className="orange">Privacy Policy →</Link>
          </div>
        </div>
      </main>
    </>
  )
}