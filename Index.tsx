import React from "react";

/**
 * ZQ Minimal Portfolio — Fixed image paths + updated project copy
 */

// ---------- Theme (minimal) ----------
const COLORS = {
  bg: "bg-white",
  text: "text-slate-900",
  sub: "text-slate-600",
  brand: "#0f172a", // deep navy
  border: "border-slate-200",
};

// Asset helper function
const A = (p: string) => `${p}`;

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${COLORS.bg} ${COLORS.text} antialiased`}>
      {children}
      <style>{`
        html { scroll-behavior: smooth; }
        .container { max-width: 1080px; }
        .brand { color: ${COLORS.brand}; }
        .card { border: 1px solid rgba(15,23,42,.08); border-radius: 16px; }
        .pill { border: 1px solid rgba(15,23,42,.12); border-radius: 9999px; }
        .divider { height:1px; background: rgba(15,23,42,.08) }
        .shadow-soft { box-shadow: 0 4px 14px rgba(15,23,42,.06); }
      `}</style>
    </div>
  );
}

// ---------- Reusable bits ----------
function Section({ id, title, children, kicker }: { id: string; title: string; children: React.ReactNode; kicker?: string }) {
  return (
    <section id={id} className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          {kicker && (
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">{kicker}</div>
          )}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4 shadow-soft">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

// ---------- Top Nav ----------
function Nav() {
  const items = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#certs", label: "Certifications" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="container mx-auto px-4 h-14 flex items-center gap-6">
        <a href="#about" className="font-semibold tracking-tight">Zubin Qayam</a>
        <nav className="ml-auto hidden md:flex gap-5 text-sm">
          {items.map((i) => (
            <a key={i.href} href={i.href} className="hover:underline underline-offset-4">
              {i.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ---------- Hero (HD port image) ----------
function Hero() {
  return (
    <header className="relative">
      <img src={A("assets/hero-port.jpg")} alt="Port of Sohar — aerial HD" className="w-full h-[44vh] md:h-[56vh] object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="relative -mt-16 md:-mt-20 max-w-3xl card bg-white shadow-soft p-6">
          <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Corporate BD & Marketing</div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-1">Unlocking material revenue impact across Oman's industrial healthcare</h1>
          <p className="mt-3 text-slate-600">Based in Sohar, Oman • zubin.qayam@outlook.com • +968 7857 2706</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="https://www.linkedin.com/in/zubin-qayam-p-m-b22bb7170" target="_blank" rel="noreferrer" className="pill px-3 py-1.5 hover:bg-slate-50">LinkedIn</a>
            <a href="https://g.dev/zubinqayam" target="_blank" rel="noreferrer" className="pill px-3 py-1.5 hover:bg-slate-50">Google Developer</a>
            <a href="https://www.credly.com/users/zubin-qayam/badges" target="_blank" rel="noreferrer" className="pill px-3 py-1.5 hover:bg-slate-50">Credly</a>
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------- Image strip (small enhancers) ----------
function ImageStrip() {
  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <img src={A("assets/strip-ship.jpg")} alt="Ship in port" className="h-28 md:h-32 w-full object-cover rounded-lg" />
        <img src={A("assets/strip-industrial.jpg")} alt="Industrial plant" className="h-28 md:h-32 w-full object-cover rounded-lg" />
        <img src={A("assets/panel-strategic.png")} alt="Strategic industry position" className="h-28 md:h-32 w-full object-cover rounded-lg hidden md:block" />
      </div>
    </div>
  );
}

// ---------- Projects (healthcare‑centric wording) ----------
function Projects() {
  const items = [
    {
      title: "Sohar Freezone Healthcare Enablement",
      subtitle: "Vision 2040 alignment",
      body:
        "Developed a healthcare infrastructure pipeline through strong corporate relationships with zone stakeholders and tenants, establishing Vision 2040 leadership in service readiness.",
    },
    {
      title: "Sohar Port South Development",
      subtitle: "Healthcare readiness blueprint",
      body:
        "Framed on-site medical coverage and referral pathways to scale alongside port capacity expansion, ensuring safe, sustainable operations.",
    },
    {
      title: "Shinas Port Modernization",
      subtitle: "Community health & awareness",
      body:
        "Focused on medical services and health awareness initiatives to support modernization for trade, tourism, and light industry.",
    },
    {
      title: "United Solar • Corporate Partnership",
      subtitle: "Industrial healthcare model",
      body:
        "Structured partner pathways and site medical capabilities for polysilicon partners in the region.",
    },
    {
      title: "Renewable Energy • Corporate Engagement",
      subtitle: "Scale‑up facilitation",
      body:
        "Positioned healthcare ecosystem support for renewable energy workforce development and operational readiness.",
    },
    {
      title: "Marsa LNG • Strategic Collaboration",
      subtitle: "Renewables‑powered facility context",
      body:
        "Outlined healthcare framework principles tailored to a renewables‑powered LNG operation, from on‑site response to tertiary pathways.",
    },
  ];
  return (
    <Section id="projects" title="Projects" kicker="Selected work">
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((it) => (
          <article key={it.title} className="card p-5 shadow-soft">
            <h3 className="text-lg font-semibold tracking-tight">{it.title}</h3>
            <div className="text-sm text-slate-500 mt-0.5">{it.subtitle}</div>
            <p className="mt-3 text-slate-700">{it.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <img src={A("assets/panel-badges.png")} alt="Executive partnership badges" className="rounded-lg shadow-soft" />
        <img src={A("assets/panel-healthcare.png")} alt="Healthcare transformation emblems" className="rounded-lg shadow-soft" />
        <img src={A("assets/panel-vision.png")} alt="Vision 2040 strategic squares" className="rounded-lg shadow-soft" />
      </div>
    </Section>
  );
}

// ---------- Skills ----------
function Skills() {
  const pillars = [
    {
      title: "Business Development",
      items: ["Partnership structuring", "Account growth", "Stakeholder engagement"],
    },
    {
      title: "Corporate Marketing",
      items: ["ABM programs", "Value propositions", "Campaign orchestration"],
    },
    {
      title: "Data & Platforms",
      items: ["HubSpot / Salesforce", "Power BI, GA4", "Copilot, GCP, Azure"],
    },
  ];
  return (
    <Section id="skills" title="Skills" kicker="Core strengths">
      <div className="grid md:grid-cols-3 gap-4">
        {pillars.map((p) => (
          <div key={p.title} className="card p-5 shadow-soft">
            <h3 className="font-medium">{p.title}</h3>
            <ul className="mt-2 text-slate-700 text-sm space-y-1">
              {p.items.map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <img src={A("assets/vision-hero.jpg")} alt="Oman Vision 2040" className="w-full h-48 md:h-56 object-cover rounded-lg shadow-soft" />
      </div>
    </Section>
  );
}

// ---------- Certifications ----------
function Certs() {
  const groups = [
    {
      org: "Microsoft Learn",
      items: ["Responsible AI with GitHub Copilot", "Explore Core Data Concepts"],
    },
    {
      org: "Google Developer",
      items: ["Google Cloud Innovator", "AI-powered market analysis app"],
    },
    {
      org: "HubSpot Academy",
      items: ["Inbound Marketing", "Contextual Marketing & ABM"],
    },
  ];
  return (
    <Section id="certs" title="Certifications" kicker="Verified learning">
      <div className="grid md:grid-cols-3 gap-4">
        {groups.map((g) => (
          <div key={g.org} className="card p-5 shadow-soft">
            <h3 className="font-medium">{g.org}</h3>
            <ul className="mt-2 text-slate-700 text-sm space-y-1">
              {g.items.map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ---------- Contact ----------
function Contact() {
  return (
    <Section id="contact" title="Contact" kicker="Let's connect">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-5 shadow-soft">
          <div className="text-sm text-slate-700 space-y-2">
            <div>Sohar, Oman</div>
            <div>
              <a href="mailto:zubin.qayam@outlook.com" className="underline decoration-slate-300 hover:decoration-slate-600">zubin.qayam@outlook.com</a>
            </div>
            <div>
              <a href="tel:+96878572706" className="underline decoration-slate-300 hover:decoration-slate-600">+968 7857 2706</a>
            </div>
            <div className="flex gap-3 pt-2">
              <a href="https://www.linkedin.com/in/zubin-qayam-p-m-b22bb7170" className="pill px-3 py-1.5 hover:bg-slate-50" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://g.dev/zubinqayam" className="pill px-3 py-1.5 hover:bg-slate-50" target="_blank" rel="noreferrer">Google Dev</a>
              <a href="https://www.credly.com/users/zubin-qayam/badges" className="pill px-3 py-1.5 hover:bg-slate-50" target="_blank" rel="noreferrer">Credly</a>
            </div>
          </div>
        </div>
        <form className="card p-5 shadow-soft" onSubmit={(e) => e.preventDefault()} aria-label="Contact form">
          <div className="grid gap-3">
            <input className="border border-slate-200 rounded-lg px-3 py-2" placeholder="Name" required />
            <input type="email" className="border border-slate-200 rounded-lg px-3 py-2" placeholder="Email" required />
            <textarea className="border border-slate-200 rounded-lg px-3 py-2 min-h-[120px]" placeholder="Message" required />
            <button className="px-4 py-2 rounded-lg text-white" style={{ background: COLORS.brand }}>Send</button>
            <p className="text-xs text-slate-500">Wire this to Formspree or your API later.</p>
          </div>
        </form>
      </div>
    </Section>
  );
}

export default function ZQPortfolioMinimal() {
  return (
    <Shell>
      <Nav />
      <Hero />
      <ImageStrip />

      <Section id="about" title="About" kicker="Profile">
        <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-6 items-start">
          <div className="card p-5 shadow-soft">
            <p className="text-slate-700 leading-relaxed">
              Corporate business development and marketing professional focused on Oman's industrial healthcare ecosystem. I translate complex stakeholder landscapes into clear partnership structures, operational health readiness, and brand trust—ultimately unlocking material revenue impact.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Location" value="Sohar, Oman" />
            <Stat label="Focus" value="Industrial Healthcare" />
            <Stat label="Approach" value="Partnership-led" />
          </div>
        </div>
      </Section>

      <Projects />
      <Skills />
      <Certs />
      <Contact />

      <footer className="mt-8 border-t border-slate-200">
        <div className="container mx-auto px-4 py-8 text-sm text-slate-600">
          © {new Date().getFullYear()} Zubin Qayam • Clean, minimal portfolio • About · Projects · Skills · Certifications · Contact
        </div>
      </footer>
    </Shell>
  );
}