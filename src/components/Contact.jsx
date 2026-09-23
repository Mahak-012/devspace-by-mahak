import { useEffect, useRef, useState } from "react";

/* ---------------------------------- Icons ----------------------------------- */

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

/* ---------------------------------- Data ----------------------------------- */

const EMAIL = "mahakmimi01@gmail.com";

const SOCIALS = [
  { name: "LinkedIn", icon: <LinkedInIcon />, link: "https://www.linkedin.com/in/mahak-webdev/" },
  { name: "GitHub", icon: <GitHubIcon />, link: "https://github.com/Mahak-012" },
  { name: "Instagram", icon: <InstagramIcon />, link: "https://www.instagram.com/mahak_codes22" },
];

const CONTACT_INFO = [
  { icon: "✉️", label: "Email", value: EMAIL, copyable: true },
  { icon: "📍", label: "Location", value: "Lahore, Pakistan" },
  { icon: "💼", label: "Open for", value: "Freelance & Agency Contracts" },
  { icon: "⚡", label: "Response Time", value: "Under 24 hours" },
];

/* --------------------------------- Contact ----------------------------------- */

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); // "" | sending | success | error
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [spot, setSpot] = useState({ x: "50%", y: "40%" });
  const sectionRef = useRef(null);

  /* Section-level cursor spotlight */
  const onMove = (e) => {
    const r = sectionRef.current.getBoundingClientRect();
    setSpot({
      x: `${((e.clientX - r.left) / r.width) * 100}%`,
      y: `${((e.clientY - r.top) / r.height) * 100}%`,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors((p) => ({ ...p, [e.target.name]: false }));
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = true;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) next.email = true;
    if (!formData.message.trim()) next.message = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;

    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/mrededwl", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 8000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus(""), 4000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus(""), 4000);
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:border-[#00d9ff]/60 focus:ring-1 focus:ring-[#00d9ff]/25";

  const errState = "border-red-500/60";

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative overflow-hidden bg-[#05070a] py-20 px-6 md:px-12 md:py-28 font-sans"
    >
      <style>{`
        @keyframes ct-spin { to { transform: rotate(360deg); } }
        @keyframes ct-draw { to { stroke-dashoffset: 0; } }
        @keyframes ct-pop {
          0%   { transform: scale(0.6); opacity: 0; }
          60%  { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .ct-check {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: ct-draw 0.5s ease-out 0.2s forwards;
        }
        .ct-pop { animation: ct-pop 0.5s ease-out; }
      `}</style>

      {/* Cursor spotlight — neon */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${spot.x} ${spot.y}, rgba(0,217,255,0.05), transparent 55%)`,
        }}
      />

      {/* Top hairline */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00d9ff]/40 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#00d9ff]/[0.04] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ─── Section Heading ─── */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-cyan-500">
              // Final Transmission
            </span>
            <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
              Let's Build{" "}
              <span className="text-outline-strong">Something.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
            A project, a contract, or just a question — the form lands
            directly in my inbox. No middlemen.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">

          {/* ══════════════ LEFT — Info Panel ══════════════ */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#00d9ff]/12 bg-[#080b0f] p-6 transition-all duration-500 hover:border-[#00d9ff]/30 md:p-8">
            {/* Corner brackets */}
            <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[#00d9ff]/30 transition-colors duration-500 group-hover:border-[#00d9ff]/70" />
            <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[#00d9ff]/30 transition-colors duration-500 group-hover:border-[#00d9ff]/70" />

            <div className="relative">
              {/* Availability status */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00d9ff]/25 bg-[#00d9ff]/[0.05] px-3.5 py-1.5 font-mono text-[10px] tracking-widest text-cyan-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </span>
                AVAILABLE FOR WORK — 2025
              </div>

              <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                Let's Talk.
              </h3>

              <p className="mb-8 mt-3 text-sm leading-relaxed text-zinc-400">
                Currently accepting freelance projects and white-label agency
                contracts. Tell me what you're building — I'll tell you how
                fast we can ship it.
              </p>

              {/* Contact details */}
              <div className="mb-8 space-y-3">
                {CONTACT_INFO.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3.5 rounded-xl border border-zinc-900 bg-white/[0.02] px-4 py-3 transition-colors duration-300 hover:border-[#00d9ff]/25"
                  >
                    <span className="text-base">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="mono text-[10px] uppercase tracking-widest text-zinc-600">
                        {item.label}
                      </p>
                      <p className="truncate text-sm text-zinc-200">{item.value}</p>
                    </div>
                    {item.copyable && (
                      <button
                        onClick={copyEmail}
                        aria-label="Copy email"
                        className={`ml-auto flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-medium transition-all duration-300 ${
                          copied
                            ? "border-[#00d9ff] bg-[#00d9ff] text-black shadow-[0_0_15px_rgba(0,217,255,0.4)]"
                            : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-[#00d9ff]/50 hover:text-cyan-300"
                        }`}
                      >
                        {copied ? <CheckIcon /> : <CopyIcon />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="border-t border-zinc-900 pt-6">
                <p className="mono mb-4 text-[10px] uppercase tracking-widest text-zinc-600">
                  // connect with me
                </p>
                <div className="flex gap-3">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#00d9ff] hover:bg-[#00d9ff] hover:text-black hover:shadow-[0_0_22px_rgba(0,217,255,0.35)]"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════ RIGHT — Form (terminal-style) ══════════════ */}
          <div className="relative overflow-hidden rounded-2xl border border-[#00d9ff]/15 bg-[#080b0f]">
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-[#00d9ff]/12 bg-zinc-900/40 px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                </div>
                <span className="mono text-[10px] tracking-widest text-zinc-500">
                  ~/send_message.sh
                </span>
              </div>
              <span className="mono flex items-center gap-1.5 text-[8px] tracking-widest text-cyan-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </span>
                ONLINE
              </span>
            </div>

            {status === "success" ? (
              /* ─────────────── SUCCESS ─────────────── */
              <div className="flex min-h-[480px] flex-col items-center justify-center px-8 py-12 text-center">
                <div
                  className="ct-pop flex h-16 w-16 items-center justify-center rounded-full border border-[#00d9ff]/40 bg-[#00d9ff]/[0.08]"
                  style={{ boxShadow: "0 0 40px rgba(0,217,255,0.2)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00d9ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                    <path className="ct-check" d="m4 12.5 5 5L20 6.5" />
                  </svg>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-white">
                  Message Sent.
                </h3>
                <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-zinc-400">
                  Landed in my inbox. Expect a reply within{" "}
                  <span className="text-cyan-300">24 hours</span>.
                </p>

                <div className="mono mt-6 rounded-lg border border-[#00d9ff]/20 bg-black/50 px-4 py-2 text-[10px] tracking-widest text-cyan-500">
                  $ status: delivered ✓
                </div>
              </div>
            ) : (
              /* ─────────────── FORM ─────────────── */
              <form onSubmit={handleSubmit} noValidate className="space-y-5 p-6 md:p-8">
                <h3 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                  Send a Message
                </h3>

                {/* Name */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="mono text-[11px] uppercase tracking-wider text-zinc-500">
                      Your Name
                    </label>
                    {errors.name && (
                      <span className="text-[11px] font-medium text-red-400">required</span>
                    )}
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.name ? errState : "border-zinc-800"}`}
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="mono text-[11px] uppercase tracking-wider text-zinc-500">
                      Email Address
                    </label>
                    {errors.email && (
                      <span className="text-[11px] font-medium text-red-400">
                        valid email required
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.email ? errState : "border-zinc-800"}`}
                    placeholder="john@company.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="mono text-[11px] uppercase tracking-wider text-zinc-500">
                      Message
                    </label>
                    <span className="mono text-[10px] text-zinc-600">
                      {formData.message.length} / 500
                    </span>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={500}
                    rows="4"
                    className={`${inputBase} resize-none ${errors.message ? errState : "border-zinc-800"}`}
                    placeholder="Hi Mahak, I'd love to work with you..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-white group relative w-full py-4 text-sm uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    {status === "sending" ? (
                      <>
                        <span
                          className="h-4 w-4 rounded-full border-2 border-cyan-300/40 border-t-black"
                          style={{ animation: "ct-spin 0.7s linear infinite" }}
                        />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </span>
                </button>

                {status === "error" && (
                  <p className="text-center text-xs text-red-400">
                    Something went wrong — try again or email me directly.
                  </p>
                )}

                <p className="mono text-center text-[10px] tracking-widest text-zinc-700">
                  SECURE · DIRECT TO INBOX · NO SPAM EVER
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}