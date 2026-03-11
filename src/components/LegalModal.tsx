'use client'
import { useEffect } from 'react'

type LegalType = 'privacy' | 'terms'

interface LegalModalProps {
  type: LegalType
  onClose: () => void
}

function PrivacyContent() {
  return (
    <div className="lm-body">
      <div className="lm-tag">Legal</div>
      <h1 className="lm-title">Privacy Policy</h1>
      <div className="lm-meta">
        <span>Effective: 2 March 2026</span>
        <span>Last updated: 2 March 2026</span>
      </div>
      <div className="lm-intro">
        Skillza is committed to protecting your personal information in accordance with the <strong>Protection of Personal Information Act 4 of 2013 (POPIA)</strong> and all applicable South African data protection laws. This Privacy Policy explains how we collect, use, store, and protect your information when you use the Skillza platform.
      </div>

      <hr className="lm-rule" />

      <h2>1. Who We Are</h2>
      <p>Skillza is a South African student talent marketplace that connects university students offering services with clients seeking affordable, verified creative and professional talent. We act as the responsible party for personal information collected through our platform.</p>
      <div className="lm-box orange">
        <p>📧 Contact: <a href="mailto:hello@skillza.co.za">hello@skillza.co.za</a></p>
      </div>

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
      <p>All systems are password protected and access is restricted to authorised Skillza team members only.</p>

      <h2>5. Who Can See Your Information</h2>
      <p>We do not sell, trade, or share your personal information with third parties except:</p>
      <ul>
        <li>Service providers who process data on our behalf (Google, Formspree) — under their respective privacy policies</li>
        <li>Where required by South African law or a court order</li>
        <li>With your explicit consent</li>
      </ul>
      <div className="lm-box orange">
        <p>Student profiles displayed on the Skillza website are intentionally public — name, skill, university, bio, portfolio, and pricing. To remove your profile, contact us at <a href="mailto:hello@skillza.co.za">hello@skillza.co.za</a>.</p>
      </div>

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
      <div className="lm-box orange">
        <p>The Information Regulator of South Africa can be contacted at: <a href="mailto:inforeg@justice.gov.za">inforeg@justice.gov.za</a></p>
      </div>

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
    </div>
  )
}

function TermsContent() {
  return (
    <div className="lm-body">
      <div className="lm-tag">Legal</div>
      <h1 className="lm-title">Terms of Service</h1>
      <div className="lm-meta">
        <span>Effective: 2 March 2026</span>
        <span>Last updated: 2 March 2026</span>
      </div>
      <div className="lm-intro">
        Please read these Terms of Service carefully before using the Skillza platform. By using Skillza, you agree to be bound by these terms. If you do not agree, do not use our platform.
      </div>

      <hr className="lm-rule" />

      <h2>1. About Skillza</h2>
      <p>Skillza is an online marketplace that connects South African university students (&ldquo;Students&rdquo;) offering creative and professional services with individuals and businesses (&ldquo;Clients&rdquo;) seeking those services.</p>
      <div className="lm-box yellow">
        <p>⚠️ <strong>Important:</strong> Skillza is a platform — we are not an employer, agency, or service provider. We do not perform, supervise, or guarantee any services listed on the platform.</p>
      </div>

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
        <li>Client and Student communicate directly via WhatsApp to agree on scope and final pricing</li>
        <li>A 30% deposit is paid by the Client before work begins</li>
        <li>The remaining 70% balance is paid directly to the Student upon satisfactory completion</li>
      </ul>
      <div className="lm-box orange">
        <p>Skillza is not a party to any agreement between a Client and a Student. The agreement is solely between the Client and the Student.</p>
      </div>

      <h2>5. Payment and Deposits</h2>
      <p>In Phase 1 of our platform, payments are made directly between Clients and Students via EFT or SnapScan. Skillza does not process, hold, or guarantee any payments at this stage.</p>
      <ul>
        <li>The 30% deposit is paid before any work begins</li>
        <li>The deposit is non-refundable if the Client cancels after work has commenced</li>
        <li>The balance is payable upon satisfactory delivery of the agreed service</li>
        <li>Any disputes regarding payment are between the Client and the Student directly</li>
      </ul>
      <p>Skillza accepts no liability for any payment disputes, fraudulent transactions, or financial loss arising from transactions between Clients and Students.</p>

      <h2>6. Safety and Conduct</h2>
      <p>All users agree to:</p>
      <ul>
        <li>Treat all other users with respect and professionalism</li>
        <li>Meet in safe, public, or professional spaces for first-time in-person jobs</li>
        <li>Never use the platform to solicit or engage in any illegal activity</li>
        <li>Report any suspicious, threatening, or inappropriate behaviour to <a href="mailto:hello@skillza.co.za">hello@skillza.co.za</a> immediately</li>
      </ul>
      <div className="lm-box yellow">
        <p>⚠️ Skillza verifies student enrolment but does not conduct criminal background checks on Students or Clients. Users are responsible for exercising their own judgment before meeting in person or engaging services.</p>
      </div>

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
    </div>
  )
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <>
      <style>{`
        .lm-overlay {
          position: fixed; inset: 0; z-index: 900;
          display: flex; align-items: flex-end;
          background: rgba(17,17,16,.55);
          backdrop-filter: blur(6px);
          animation: lmFadeIn .2s ease;
        }
        @keyframes lmFadeIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        .lm-sheet {
          width: 100%; max-height: 90dvh;
          background: #FAFAF6;
          border-radius: 20px 20px 0 0;
          display: flex; flex-direction: column;
          animation: lmSlideUp .3s cubic-bezier(.22,1,.36,1);
          overflow: hidden;
        }
        @keyframes lmSlideUp {
          from { transform: translateY(60px); opacity: 0 }
          to   { transform: translateY(0);    opacity: 1 }
        }
        .lm-sheet-head {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 28px; height: 64px;
          border-bottom: 1px solid rgba(17,17,16,.08);
          position: relative;
        }
        .lm-sheet-head::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #1445FF 0%, #7C3AED 25%, #FF4520 50%, #AAFF00 75%, #F59E0B 100%);
        }
        .lm-sheet-drag {
          position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
          width: 36px; height: 4px; border-radius: 2px;
          background: rgba(17,17,16,.15);
        }
        .lm-sheet-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px; letter-spacing: 1.5px;
          color: #111110; margin-top: 3px;
        }
        .lm-close-btn {
          width: 36px; height: 36px; border-radius: 10px;
          border: 1px solid rgba(17,17,16,.12);
          background: rgba(17,17,16,.04);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(17,17,16,.5);
          transition: all .15s; flex-shrink: 0;
        }
        .lm-close-btn:hover {
          background: rgba(17,17,16,.08);
          color: #111110;
          border-color: rgba(17,17,16,.2);
        }
        .lm-scroll {
          flex: 1; overflow-y: auto; overscroll-behavior: contain;
          padding: 32px 28px 48px;
          max-width: 760px; width: 100%; margin: 0 auto;
        }
        @media (min-width: 680px) {
          .lm-sheet { max-height: 85dvh; border-radius: 24px 24px 0 0; }
          .lm-scroll { padding: 36px 40px 60px; }
          .lm-sheet-head { padding: 0 40px; }
        }
        @media (min-width: 1024px) {
          .lm-overlay { align-items: center; padding: 24px; }
          .lm-sheet {
            max-height: 88dvh; border-radius: 20px;
            max-width: 780px; margin: 0 auto;
          }
        }

        /* Content typography */
        .lm-body { color: #111110; }

        .lm-tag {
          display: inline-block; font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: #1445FF; background: rgba(20,69,255,.08);
          border: 1px solid rgba(20,69,255,.2); border-radius: 100px;
          padding: 4px 14px; margin-bottom: 14px;
        }
        .lm-body h1.lm-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 5vw, 42px);
          letter-spacing: 2px; line-height: 1;
          color: #111110; margin-bottom: 10px;
        }
        .lm-meta {
          font-size: 12px; color: rgba(17,17,16,.45); margin-bottom: 22px;
          display: flex; gap: 16px; flex-wrap: wrap;
        }
        .lm-intro {
          font-size: 14px; color: rgba(17,17,16,.7); line-height: 1.8;
          padding: 16px 20px; background: rgba(17,17,16,.04);
          border: 1px solid rgba(17,17,16,.08); border-radius: 12px;
          margin-bottom: 24px;
        }
        .lm-intro strong { color: #111110; }
        .lm-rule {
          border: none; border-top: 1px solid rgba(17,17,16,.1); margin: 24px 0;
        }
        .lm-body h2 {
          font-size: 15px; font-weight: 700; color: #111110;
          margin: 28px 0 8px; padding-bottom: 8px;
          border-bottom: 1px solid rgba(17,17,16,.08);
        }
        .lm-body h3 {
          font-size: 12px; font-weight: 700; color: #FF4520;
          text-transform: uppercase; letter-spacing: .5px; margin: 14px 0 6px;
        }
        .lm-body p {
          font-size: 14px; color: rgba(17,17,16,.72);
          margin-bottom: 10px; line-height: 1.8;
        }
        .lm-body ul {
          margin: 6px 0 12px 0; padding: 0; list-style: none;
        }
        .lm-body ul li {
          font-size: 14px; color: rgba(17,17,16,.68); line-height: 1.8;
          padding: 4px 0 4px 20px; position: relative;
          border-bottom: 1px solid rgba(17,17,16,.05);
        }
        .lm-body ul li:last-child { border-bottom: none; }
        .lm-body ul li::before {
          content: '→'; position: absolute; left: 0;
          color: #FF4520; font-size: 11px; top: 6px;
        }
        .lm-box {
          border-radius: 10px; padding: 14px 18px; margin: 14px 0;
        }
        .lm-box.orange {
          background: rgba(255,69,32,.06); border: 1px solid rgba(255,69,32,.2);
        }
        .lm-box.yellow {
          background: rgba(245,158,11,.06); border: 1px solid rgba(245,158,11,.25);
        }
        .lm-box p { margin: 0; color: rgba(17,17,16,.72) !important; }
        .lm-body a { color: #FF4520; text-decoration: none; }
        .lm-body a:hover { text-decoration: underline; }
      `}</style>

      {/* Backdrop — click to close */}
      <div
        className="lm-overlay"
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
        role="dialog"
        aria-modal="true"
        aria-label={type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
      >
        <div className="lm-sheet">
          {/* Header */}
          <div className="lm-sheet-head">
            <div className="lm-sheet-drag" aria-hidden="true" />
            <span className="lm-sheet-title">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </span>
            <button
              className="lm-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>
          </div>

          {/* Scrollable body */}
          <div className="lm-scroll">
            {type === 'privacy' ? <PrivacyContent /> : <TermsContent />}
          </div>
        </div>
      </div>
    </>
  )
}

export default LegalModal
