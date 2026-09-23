import { useState, useEffect } from "react";

/* ---------------------------------- Data ----------------------------------- */

const LINKS = [
  { label: "Home",     id: "home" },
  { label: "About",    id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Services", id: "services" },
  { label: "Contact",  id: "contact" },
];

const OFFSET = 80;

/* -------------------------------- Navbar ----------------------------------- */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState("home");
  const [open, setOpen] = useState(false);
  const [logoOk, setLogoOk] = useState(true);

  /* Scroll: shrink + progress + scroll-spy */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      setProgress(max > 0 ? (y / max) * 100 : 0);

      let cur = "home";
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= OFFSET + 40) cur = id;
      }
      setActiveId(cur);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Mobile menu: scroll lock + ESC close */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  /* Smooth scroll with navbar offset */
  const goTo = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-[#00d9ff]/15 bg-[#05070a]/85 backdrop-blur-2xl"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* ── Neon scroll progress bar ── */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00d9ff] via-[#38bdf8] to-[#00d9ff] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%`, boxShadow: "0 0 12px rgba(0,217,255,0.7)" }}
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* ── LOGO ── */}
          <a
            href="#home"
            onClick={(e) => goTo(e, "home")}
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            {logoOk ? (
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[#00d9ff]/40 bg-[#0c1218] shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,217,255,0.4)]">
                <img
                  src="/logo.png"
                  alt="Mahak logo"
                  className="h-full w-full object-cover"
                  onError={() => setLogoOk(false)}
                />
              </span>
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#00d9ff]/50 bg-[#0c1218] font-display text-lg font-bold text-[#00d9ff] shadow-[0_0_20px_rgba(0,217,255,0.25)] transition-transform duration-300 group-hover:scale-110">
                M
              </span>
            )}

            <span className="font-display text-sm font-bold tracking-[0.2em] text-white">
              DEVSPACE<span className="text-[#00d9ff] drop-shadow-[0_0_8px_rgba(0,217,255,0.6)]">.BY.MAHAK</span>
            </span>
          </a>

          {/* ── DESKTOP LINKS ── */}
          <div className="hidden items-center gap-7 md:flex">
            {LINKS.map(({ label, id }) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => goTo(e, id)}
                  className={`mono group relative py-1 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive
                      ? "text-[#00d9ff] drop-shadow-[0_0_6px_rgba(0,217,255,0.5)]"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <span
                    className={`mr-1 transition-colors duration-300 ${
                      isActive ? "text-[#00d9ff]/70" : "text-zinc-700 group-hover:text-[#00d9ff]/50"
                    }`}
                  >
                    /
                  </span>
                  {label}

                  {/* Neon underline */}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[#00d9ff] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    style={{ boxShadow: "0 0 8px rgba(0,217,255,0.8)" }}
                  />
                </a>
              );
            })}
          </div>

          {/* ── DESKTOP CTA ── */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => goTo(e, "contact")}
              className="btn-white inline-block px-5 py-2.5 text-xs uppercase tracking-wider"
            >
              Let's Talk
            </a>
          </div>

          {/* ── HAMBURGER (mobile) ── */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-50 p-2 md:hidden"
          >
            <div className="flex w-6 flex-col gap-1.5">
              <span
                className="h-0.5 w-full rounded-full bg-[#00d9ff] shadow-[0_0_6px_rgba(0,217,255,0.6)] transition-transform duration-300"
                style={open ? { transform: "translateY(8px) rotate(45deg)" } : {}}
              />
              <span
                className="h-0.5 w-full rounded-full bg-[#00d9ff]/70 transition-opacity duration-300"
                style={open ? { opacity: 0 } : {}}
              />
              <span
                className="h-0.5 w-full rounded-full bg-[#00d9ff] shadow-[0_0_6px_rgba(0,217,255,0.6)] transition-transform duration-300"
                style={open ? { transform: "translateY(-8px) rotate(-45deg)" } : {}}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ── MOBILE OVERLAY ── */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#05070a]/[0.98] px-6 backdrop-blur-3xl transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        {/* Neon glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/4 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-[#00d9ff]/[0.07] blur-[120px]" />

        {/* Neon watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute select-none font-display text-[38vw] font-bold leading-none text-[#00d9ff]/[0.06]"
        >
          M
        </div>

        {/* Links with stagger */}
        {LINKS.map(({ label, id }, i) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => goTo(e, id)}
            className={`group relative py-3 font-display text-3xl font-bold tracking-tight transition-all duration-500 ${
              activeId === id
                ? "text-[#00d9ff] drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]"
                : "text-zinc-500 hover:text-[#00d9ff]"
            } ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
          >
            <span className="mono mr-3 text-xs font-normal text-zinc-700">0{i + 1}</span>
            {label}
            <span
              className={`absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-[#00d9ff] transition-all duration-300 ${
                activeId === id ? "w-1/2" : "w-0 group-hover:w-1/3"
              }`}
              style={{ boxShadow: "0 0 8px rgba(0,217,255,0.8)" }}
            />
          </a>
        ))}

        {/* Footer note */}
        <div
          className={`mono absolute bottom-10 text-[10px] tracking-[0.3em] text-zinc-600 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: open ? "500ms" : "0ms" }}
        >
          DEVSPACE <span className="text-[#00d9ff]/60">//</span> BY MAHAK
        </div>
      </div>
    </>
  );
}