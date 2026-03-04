import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Skillza',
  description: 'How Skillza collects, uses and protects your personal information in accordance with POPIA.',
}

export default function PrivacyPage() {
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
          <div className="lm-title">Privacy Policy</div>
          <div className="lm-meta">
            <span>📅 Effective: 2 March 2026</span>
            <span>🔄 Last updated: 2 March 2026</span>
          </div>
          <div className="lm-intro">
            Skillza is committed to protecting your personal information in accordance with the <strong>Protection of Personal Information Act 4 of 2013 (POPIA)</strong> and all applicable South African data protection laws. This Privacy Policy explains how we collect, use, store, and protect your information when you use the Skillza platform.
          </div>

          <hr className="lm-rule" />

          <h2>1. Who We Are</h2>
          <p>Skillza is a South African student talent marketplace that connects university students offering services with clients seeking affordable, verified creative and professional talent. We act as the responsible party for personal information collected through our platform.</p>
          <div className="hb"><p>📧 Contact: <a href="mailto:hello@skillza.co.za">hello@skillza.co.za</a></p></div>

          <h2>2. What Information We Collect</h2>
          <h3>From Clients (people booking students)</h3>
          <ul>
            <li>Full name</li>
            <li>WhatsApp number</li>
            <li>Email address</li>
            <li>Description of services requested</li>
            <li>Booking reference numbers</li>
          </ul>
          <h3>From Students (people listing their services)</h3>
          <ul>
            <li>Full name</li>
            <li>Email address and WhatsApp number</li>
            <li>Student number (for verification only)</li>
            <li>University student card photo</li>
            <li>University, year of study, and faculty</li>
            <li>Bio, portfolio links, and pricing information</li>
            <li>City and general availability</li>
          </ul>

          <h2>3. Why We Collect This Information</h2>
          <p>We collect and process personal information for the following legitimate purposes:</p>
          <ul>
            <li>To verify that students are currently enrolled at a recognised South African university</li>
            <li>To create and display student profiles on the Skillza platform</li>
            <li>To facilitate bookings and connect clients with students</li>
            <li>To send booking confirmations and reference numbers</li>
            <li>To communicate with you about your listing or booking</li>
            <li>To improve our platform and services</li>
            <li>To comply with our legal obligations</li>
          </ul>
          <p>We will never use your information for purposes incompatible with the above without your explicit consent.</p>

          <h2>4. How We Store Your Information</h2>
          <p>Your information is stored in the following systems:</p>
          <ul>
            <li>Google Forms and Google Sheets — for student onboarding and CRM</li>
            <li>Formspree — for booking request submissions</li>
            <li>Email (Gmail) — for booking notifications</li>
          </ul>
          <p>All systems are password protected and access is restricted to authorised Skillza team members only. We do not use unsecured spreadsheets, public folders, or unencrypted storage for personal data.</p>

          <h2>5. Who Can See Your Information</h2>
          <p>We do not sell, trade, or share your personal information with third parties except:</p>
          <ul>
            <li>Service providers who process data on our behalf (Google, Formspree) — under their respective privacy policies</li>
            <li>Where required by South African law or a court order</li>
            <li>With your explicit consent</li>
          </ul>
          <div className="hb"><p>Student profiles displayed on the Skillza website are intentionally public — name, skill, university, bio, portfolio, and pricing. If you are a student and wish to remove your profile, contact us at <a href="mailto:hello@skillza.co.za">hello@skillza.co.za</a>.</p></div>

          <h2>6. Student Card Information</h2>
          <p>Student card photos are collected solely for the purpose of verifying current university enrolment. They are:</p>
          <ul>
            <li>Stored securely in a private Google Drive folder accessible only to Skillza staff</li>
            <li>Never displayed publicly on the platform</li>
            <li>Never shared with clients or third parties</li>
            <li>Deleted upon request or when no longer needed for verification</li>
          </ul>

          <h2>7. Retention of Information</h2>
          <ul>
            <li>Student profile information: retained while your profile is active on the platform</li>
            <li>Booking requests: retained for 12 months for record-keeping purposes</li>
            <li>Student card photos: retained for the duration of your active listing, then deleted</li>
            <li>Waitlist entries: retained until the platform launches in your area or until you request deletion</li>
          </ul>

          <h2>8. Your Rights Under POPIA</h2>
          <p>As a data subject under POPIA, you have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to the processing of your information</li>
            <li>Lodge a complaint with the Information Regulator of South Africa</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:hello@skillza.co.za">hello@skillza.co.za</a>. We will respond within 30 days.</p>
          <div className="hb"><p>The Information Regulator of South Africa can be contacted at: <a href="mailto:inforeg@justice.gov.za">inforeg@justice.gov.za</a></p></div>

          <h2>9. Cookies and Tracking</h2>
          <p>Our current website does not use tracking cookies, advertising cookies, or third-party analytics scripts. We may introduce basic analytics in future and will update this policy accordingly.</p>

          <h2>10. Children and Minors</h2>
          <p>Our platform is intended for university students who are 18 years of age or older. We do not knowingly collect personal information from persons under 18. If you believe we have inadvertently collected information from a minor, contact us immediately at <a href="mailto:hello@skillza.co.za">hello@skillza.co.za</a>.</p>

          <h2>11. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify active users of material changes via email. Continued use of the platform after changes constitutes acceptance of the updated policy.</p>

          <h2>12. Contact Us</h2>
          <ul>
            <li>Email: <a href="mailto:hello@skillza.co.za">hello@skillza.co.za</a></li>
            <li>Website: <a href="https://skillza.co.za">skillza.co.za</a></li>
          </ul>

          <div className="lgl-footer">
            <Link href="/" className="">← Back to home</Link>
            <Link href="/terms" className="orange">Terms of Service →</Link>
          </div>
        </div>
      </main>
    </>
  )
}