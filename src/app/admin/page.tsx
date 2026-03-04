import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerClient } from "@supabase/ssr"

const ADMIN_EMAIL = "avi.moodley23@gmail.com"

// ✅ FIX: Use service role key so admin can read all data without RLS blocking
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function getAdminData() {
  const [studentsRes, bookingsRes, waitlistRes, verifyRes] = await Promise.all([
    supabaseAdmin.from("students").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("bookings").select("*, students(name, skill)").order("created_at", { ascending: false }).limit(50),
    supabaseAdmin.from("waitlist").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("verification_requests").select("*, students(name, university)").eq("status", "pending").order("submitted_at", { ascending: true }),
  ])
  return {
    students: studentsRes.data || [],
    bookings: bookingsRes.data || [],
    waitlist: waitlistRes.data || [],
    pendingVerifications: verifyRes.data || [],
  }
}

export default async function AdminPage() {
  // ── Admin auth check ──
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )
  // ✅ FIX: getSession works in server components, getUser was failing to read the cookie
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  if (session.user.email !== ADMIN_EMAIL) {
    redirect("/")
  }

  const { students, bookings, waitlist, pendingVerifications } = await getAdminData()
  const verified = students.filter((s: any) => s.verified)
  const pendingBookings = bookings.filter((b: any) => b.status === "pending")

  return (
    <main style={{ minHeight: "100svh", background: "var(--black)", padding: "40px 24px", fontFamily: "Instrument Sans, sans-serif", color: "var(--cream)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 32, letterSpacing: 2, marginBottom: 8 }}>
          SKILL<span style={{ color: "var(--orange)" }}>ZA</span> ADMIN
        </div>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 40 }}>Internal dashboard · {session.user.email}</p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 40 }}>
          {[
            { label: "Active Students", value: verified.length, color: "var(--green)" },
            { label: "Pending Verification", value: pendingVerifications.length, color: "var(--orange)" },
            { label: "New Bookings", value: pendingBookings.length, color: "var(--blue)" },
            { label: "Waitlist", value: waitlist.length, color: "var(--gold)" },
            { label: "Total Bookings", value: bookings.length, color: "var(--cream)" },
          ].map(stat => (
            <div key={stat.label} style={{ background: "var(--black-2)", border: "1px solid var(--border)", borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 36, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pending Verifications */}
        {pendingVerifications.length > 0 && (
          <AdminSection title="Pending Verifications" count={pendingVerifications.length} accent="var(--orange)">
            {pendingVerifications.map((v: any) => (
              <Row key={v.id}>
                <Cell><strong>{v.students?.name}</strong></Cell>
                <Cell style={{ color: "var(--muted)", fontSize: 12 }}>{v.students?.university}</Cell>
                <Cell>
                  <a href={v.card_image_url} target="_blank" rel="noreferrer" style={{ color: "var(--orange)", fontSize: 12, textDecoration: "underline" }}>
                    View Card
                  </a>
                </Cell>
                <Cell style={{ fontSize: 11, color: "var(--muted)" }}>{new Date(v.submitted_at).toLocaleDateString("en-ZA")}</Cell>
              </Row>
            ))}
          </AdminSection>
        )}

        {/* Bookings */}
        <AdminSection title="Recent Bookings" count={bookings.length} accent="var(--blue)">
          {bookings.length === 0 && <EmptyRow text="No bookings yet" />}
          {bookings.map((b: any) => (
            <Row key={b.id}>
              <Cell><strong>{b.client_name}</strong></Cell>
              <Cell style={{ color: "var(--muted)", fontSize: 12 }}>{b.students?.name ?? "—"}</Cell>
              <Cell style={{ fontFamily: "Bebas Neue, sans-serif", color: "var(--orange)", fontSize: 13 }}>{b.reference}</Cell>
              <Cell>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20,
                  background: b.status === "confirmed" ? "#16a34a22" : b.status === "pending" ? "#f9731622" : "#94a3b822",
                  color: b.status === "confirmed" ? "#4ade80" : b.status === "pending" ? "var(--orange)" : "var(--muted)"
                }}>
                  {b.status?.toUpperCase()}
                </span>
              </Cell>
              <Cell style={{ fontSize: 11, color: "var(--muted)" }}>{new Date(b.created_at).toLocaleDateString("en-ZA")}</Cell>
            </Row>
          ))}
        </AdminSection>

        {/* Students */}
        <AdminSection title="All Students" count={students.length} accent="var(--green)">
          {students.length === 0 && <EmptyRow text="No students yet" />}
          {students.map((s: any) => (
            <Row key={s.id}>
              <Cell><strong>{s.name}</strong></Cell>
              <Cell style={{ color: "var(--muted)", fontSize: 12 }}>{s.university}</Cell>
              <Cell style={{ color: "var(--muted)", fontSize: 12 }}>{s.skill}</Cell>
              <Cell>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20,
                  background: s.verified ? "#16a34a22" : "#f9731622",
                  color: s.verified ? "#4ade80" : "var(--orange)"
                }}>
                  {s.verified ? "VERIFIED" : "PENDING"}
                </span>
              </Cell>
              <Cell style={{ fontSize: 11, color: "var(--muted)" }}>{new Date(s.created_at).toLocaleDateString("en-ZA")}</Cell>
            </Row>
          ))}
        </AdminSection>

        {/* Waitlist */}
        <AdminSection title="Waitlist" count={waitlist.length} accent="var(--gold)">
          {waitlist.length === 0 && <EmptyRow text="No waitlist signups yet" />}
          {waitlist.map((w: any) => (
            <Row key={w.id}>
              <Cell><strong>{w.name}</strong></Cell>
              <Cell style={{ color: "var(--muted)", fontSize: 12 }}>{w.email}</Cell>
              <Cell>{w.university}</Cell>
              <Cell style={{ color: "var(--orange)", fontSize: 12 }}>{w.skill}</Cell>
            </Row>
          ))}
        </AdminSection>
      </div>
    </main>
  )
}

function AdminSection({ title, count, accent, children }: { title: string; count: number; accent: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 22, letterSpacing: 1 }}>{title}</h2>
        <span style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 18, color: accent }}>{count}</span>
      </div>
      <div style={{ background: "var(--black-2)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>{children}</div>
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--border)", alignItems: "center" }}>{children}</div>
}

function Cell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ fontSize: 13, ...style }}>{children}</div>
}

function EmptyRow({ text }: { text: string }) {
  return <div style={{ padding: "20px 16px", fontSize: 13, color: "var(--muted)" }}>{text}</div>
}
