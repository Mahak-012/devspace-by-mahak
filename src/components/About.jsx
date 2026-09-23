import React, { useEffect, useRef, useState } from "react";
import {
  Code2, Smartphone, Gauge, BookOpen, MapPin, ArrowUpRight,
  Copy, Check, Quote,
} from "lucide-react";

/* ------------------------------- Data -------------------------------------- */

const PILLARS = [
  {
    icon: Code2,
    title: "Craft Over Shortcuts",
    desc: "Every interface built from scratch — no bloated templates, no copy-paste culture. React.js and modern JavaScript, structured the right way.",
  },
  {
    icon: Smartphone,
    title: "Users Before Aesthetics",
    desc: "Pixel-perfect, mobile-first layouts with Tailwind CSS. Real users judge with their thumbs before their eyes — I design for both.",
  },
  {
    icon: Gauge,
    title: "Performance First",
    desc: "Fast loads, smooth motion, clean architecture. I optimize before I decorate — speed is a feature, not an afterthought.",
  },
  {
    icon: BookOpen,
    title: "Forever a Student",
    desc: "The web moves fast. New patterns, new libraries, new standards — I keep up so the work never gets outdated.",
  },
];

const METRICS = [
  { value: 20, suffix: "+", label: "Projects Shipped" },
  { value: 6, suffix: "+", label: "Core Technologies" },
  { value: 100, suffix: "%", label: "Client Focus" },
  { value: 2, suffix: "x", label: "Speed & Performance" },
];

const TOOLS = [
  "React", "Tailwind CSS", "JavaScript (ES6+)", "HTML5", "CSS3",
  "Git & GitHub", "REST APIs", "SEO", "Figma", "Vercel",
];

const JOURNEY = [
  {
    year: "THE START",
    text: "A blank file, a blinking cursor, a broken div — and zero clue what I was doing.",
  },
  {
    year: "THE GRIND",
    text: "Hundreds of hours — build, break, rebuild. Late nights turning design dreams into working interfaces.",
  },
  {
    year: "FIRST REAL BUILD",
    text: "Shipped a full corporate website for a live institute — my code, running in production for real users.",
  },
  {
    year: "NOW",
    text: "20+ live builds, agencies trusting the pipeline. And this is just the opening chapter.",
  },
];

const EMAIL = "mahakmimi01@gmail.com";

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------- Hook -------------------------------------- */

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
};

/* ------------------------------- Count-up ----------------------------------- */

const CountUp = ({ end, suffix = "", duration = 1400 }) => {
  const [display, setDisplay] = useState(REDUCED_MOTION ? end : 0);

  useEffect(() => {
    if (REDUCED_MOTION) return;
    const start = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);

  return <>{display}{suffix}</>;
};

/* --------------------------- Spotlight wrapper ------------------------------- */

const SpotlightCard = ({ children, className = "", style = {} }) => {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-[#00d9ff]/12 bg-[#080b0f] transition-all duration-500 hover:border-[#00d9ff]/35 hover:shadow-[0_0_40px_rgba(0,217,255,0.08)] ${className}`}
      style={style}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(0,217,255,0.06), transparent 65%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

/* -------------------------------- About ------------------------------------- */

export default function About() {
  const [headRef, headInView] = useInView(0.3);
  const [leftRef, leftInView] = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.1);
  const [journeyRef, journeyInView] = useInView(0.2);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-zinc-900 bg-[#05070a] py-20 px-6 md:px-12 md:py-28 font-sans"
    >
      <style>{`
        @keyframes ab-blob-a {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.5; }
          50% { transform: translate(30px,-20px) scale(1.15); opacity: 0.8; }
        }
        @keyframes ab-blob-b {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.4; }
          50% { transform: translate(-30px,20px) scale(1.1); opacity: 0.7; }
        }
        .ab-blob-a { animation: ab-blob-a 16s ease-in-out infinite; }
        .ab-blob-b { animation: ab-blob-b 20s ease-in-out infinite; }

        @keyframes ab-dot-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,217,255,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(0,217,255,0); }
        }
        .journey-dot-live { animation: ab-dot-pulse 2s ease-in-out infinite; }

        @keyframes ab-scan {
          0% { transform: translateY(-120%); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.35; }
          100% { transform: translateY(220%); opacity: 0; }
        }
        .ab-scan { animation: ab-scan 5s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ab-blob-a, .ab-blob-b, .journey-dot-live, .ab-scan { animation: none !important; }
        }
      `}</style>

      {/* Top hairline */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00d9ff]/40 to-transparent" />

      {/* Ambient blobs */}
      <div
        className="ab-blob-a pointer-events-none absolute left-10 top-20 h-80 w-80 rounded-full blur-[130px]"
        style={{ background: "rgba(0,217,255,0.08)" }}
      />
      <div
        className="ab-blob-b pointer-events-none absolute bottom-20 right-10 h-80 w-80 rounded-full blur-[130px]"
        style={{ background: "rgba(56,189,248,0.06)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ─── Section Heading ─── */}
        <div
          ref={headRef}
          className={`mb-14 flex flex-col items-center text-center transition-all duration-700 ease-out ${
            headInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan-500">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400" />
            <span>// The Story Behind The Code</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h2 className="font-display text-3xl font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl">
            Obsessed With{" "}
            <span className="text-outline-strong">The Craft,</span>{" "}
            <span className="neon-text">Not The Credit.</span>
          </h2>

          <div className="hairline-neon mt-5 w-40" />

          <p className="mt-5 max-w-2xl text-sm text-zinc-500">
            What you're scrolling through isn't talent — it's{" "}
            <span className="text-zinc-300">repetition, discipline, and a few hundred 2 AM sessions.</span>
          </p>
        </div>

        {/* ─── Main Grid ─── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">

          {/* ══════════ LEFT — Framed Image + Terminal Intro ══════════ */}
          <div ref={leftRef} className="space-y-6 lg:col-span-5">

            {/* ── Framed Image ── */}
            <div
              className={`transition-all duration-1000 ease-out ${
                leftInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative mx-auto max-w-md">
                {/* Corner brackets */}
                <span className="absolute -left-3 -top-3 h-7 w-7 border-l-2 border-t-2 border-[#00d9ff]/50" />
                <span className="absolute -right-3 -top-3 h-7 w-7 border-r-2 border-t-2 border-[#00d9ff]/50" />
                <span className="absolute -bottom-3 -left-3 h-7 w-7 border-b-2 border-l-2 border-[#00d9ff]/50" />
                <span className="absolute -bottom-3 -right-3 h-7 w-7 border-b-2 border-r-2 border-[#00d9ff]/50" />

                <div className="group relative overflow-hidden rounded-2xl border border-[#00d9ff]/20 bg-zinc-950 shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
                  {/* Terminal header */}
                  <div className="flex items-center justify-between border-b border-[#00d9ff]/15 bg-zinc-900/80 px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-cyan-500" />
                      <span className="h-2 w-2 rounded-full bg-sky-500" />
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="mono text-[10px] uppercase tracking-widest text-cyan-300/80">
                      mahak_profile.tsx
                    </span>
                    <span className="mono text-[10px] text-zinc-600">v2.4</span>
                  </div>

                  {/* ✨ Image — subtle cyan duotone, hover pe vivid (BLACK & WHITE NAHI) */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <img
                      src="/images/mahak-about.png"
                      alt="Mahak — Web Developer"
                      className="h-full w-full transform object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                      style={{ filter: "saturate(0.8) contrast(1.1) brightness(0.95) hue-rotate(-10deg)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = "saturate(1.15) contrast(1.05) brightness(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = "saturate(0.8) contrast(1.1) brightness(0.95) hue-rotate(-10deg)";
                      }}
                      onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                    />

                    {/* Fallback */}
                    <div className="absolute inset-0 -z-10 flex items-center justify-center bg-[#0b0f14]">
                      <span className="font-display text-8xl font-black tracking-tighter text-cyan-500/[0.06]">
                        MHK
                      </span>
                    </div>

                    {/* Neon glow overlay — image ke neeche se halki cyan light */}
                    <div
                      className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-40"
                      style={{
                        background:
                          "linear-gradient(160deg, rgba(0,217,255,0.15) 0%, transparent 40%, transparent 65%, rgba(0,217,255,0.1) 100%)",
                      }}
                    />

                    {/* Scan sweep */}
                    <div
                      className="ab-scan pointer-events-none absolute left-0 right-0 top-0 h-1/3"
                      style={{
                        background: "linear-gradient(to bottom, transparent, rgba(0,217,255,0.25), transparent)",
                        mixBlendMode: "screen",
                      }}
                    />

                    {/* Bottom fade */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />

                    {/* Location badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-[#00d9ff]/25 bg-black/50 px-3 py-2 font-mono text-[10px] tracking-[0.15em] text-zinc-300 backdrop-blur">
                      <span className="flex items-center gap-2 text-cyan-300">
                        <MapPin className="h-3 w-3" />
                        LAHORE, PAKISTAN
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-cyan-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                        ACTIVE
                      </span>
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute right-4 top-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-[#00d9ff]/40 bg-black/80 opacity-0 shadow-[0_0_15px_rgba(0,217,255,0.3)] backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4 text-cyan-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Terminal intro card ── */}
            <SpotlightCard
              className={`transition-all duration-1000 ease-out ${
                leftInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: REDUCED_MOTION ? "0s" : "150ms" }}
            >
              <div className="flex items-center justify-between border-b border-[#00d9ff]/10 bg-white/[0.02] px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
                  </div>
                  <span className="mono text-[10px] tracking-widest text-cyan-600">
                    ~/about_me.md
                  </span>
                </div>
                <span className="mono text-[9px] tracking-widest text-zinc-700">WHOAMI</span>
              </div>

              <div className="p-6">
                <p className="mono mb-4 text-xs text-cyan-500">
                  <span className="text-zinc-600">$</span> cat introduction.txt
                </p>

                <h3 className="font-display text-lg font-bold leading-tight text-white md:text-xl">
                  Hi, I'm <span className="text-[#00d9ff]">Mahak</span> — a Web Developer
                  who ships{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">
                    production-grade interfaces.
                  </span>
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  I specialize in turning complex design ideas into seamless, high-performance
                  web applications. Deep focus on{" "}
                  <span className="font-medium text-cyan-400">React.js, Tailwind CSS, and modern UI/UX principles</span>{" "}
                  — products that look incredible and respond lightning-fast.
                </p>

                {/* Mini status rows */}
                <div className="mt-6 space-y-2 border-t border-[#00d9ff]/10 pt-5 font-mono text-[11px]">
                  {[
                    { key: "role", value: "Web Developer → Full-Stack (in progress)" },
                    { key: "location", value: "Lahore, Pakistan 🇵🇰" },
                    { key: "focus", value: "Pixel-perfect UI · Performance · Clean Code" },
                  ].map((row) => (
                    <div key={row.key} className="flex items-center gap-2">
                      <span className="text-cyan-600">{row.key}:</span>
                      <span className="text-zinc-400">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* ══════════ RIGHT — Story + Journey + Pillars + Metrics ══════════ */}
          <div ref={rightRef} className="space-y-8 lg:col-span-7">

            {/* ── Narrative bio ── */}
            <div
              className={`space-y-4 text-sm leading-relaxed text-zinc-400 md:text-base transition-all duration-1000 ease-out ${
                rightInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <p>
                This didn't start with a portfolio. It started with a{" "}
                <span className="font-medium text-white">blank file, a blinking cursor</span>, and an
                idea that refused to leave — and me, with no idea what I was doing.
              </p>
              <p>
                I'm <span className="font-semibold text-white">Mahak</span>, a Web Developer from
                Lahore, Pakistan 🇵🇰 — and what you're scrolling through isn't talent. It's{" "}
                <span className="font-medium text-[#00d9ff]">repetition</span>. Hundreds of hours
                breaking layouts, fixing them, and understanding why they broke. Late nights
                turning design files into interfaces that actually work — for real users, on real
                devices.
              </p>
              <p>
                React.js and Tailwind CSS are my tools — but{" "}
                <span className="font-medium text-white">discipline is the real stack</span>: clean
                architecture, honest code, and one simple rule —{" "}
                <span className="font-medium text-[#00d9ff]">
                  never ship anything I wouldn't sign my name under.
                </span>
              </p>
            </div>

            {/* ═══ JOURNEY TIMELINE ═══ */}
            <div ref={journeyRef} className="relative">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="font-display text-sm font-bold uppercase tracking-wide text-white">
                  The Journey
                </span>
                <span className="mono text-[9px] tracking-widest text-zinc-700">[TIMELINE]</span>
                <span className="hairline-neon ml-2 flex-1" />
              </div>

              <div className="relative pl-8">
                {/* Connecting gradient line */}
                <div
                  className="absolute bottom-2 left-[7px] top-2 w-px"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,217,255,0.4), rgba(0,217,255,0.15) 60%, transparent)",
                  }}
                />

                {JOURNEY.map((j, i, arr) => {
                  const isLast = i === arr.length - 1;
                  return (
                    <div
                      key={j.year}
                      className="group relative pb-7 last:pb-0"
                      style={{
                        opacity: journeyInView ? 1 : 0,
                        transform: journeyInView ? "translateX(0)" : "translateX(-20px)",
                        transition: REDUCED_MOTION
                          ? "none"
                          : `opacity 0.6s ease ${0.15 + i * 0.18}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.18}s`,
                      }}
                    >
                      {/* Dot */}
                      <span
                        className={`absolute -left-8 top-1 flex h-4 w-4 items-center justify-center rounded-full ${
                          isLast ? "journey-dot-live" : ""
                        }`}
                        style={{
                          background: isLast ? "#00d9ff" : "#1a2530",
                          border: isLast ? "none" : "1.5px solid rgba(0,217,255,0.35)",
                          boxShadow: isLast ? "0 0 16px rgba(0,217,255,0.8)" : "none",
                        }}
                      >
                        {isLast && <span className="h-1 w-1 rounded-full bg-black/70" />}
                      </span>

                      {/* Year + LIVE badge */}
                      <div className="flex items-center gap-2.5">
                        <p
                          className={`mono text-[10px] font-bold uppercase tracking-[0.3em] ${
                            isLast ? "text-[#00d9ff]" : "text-zinc-500"
                          }`}
                        >
                          {j.year}
                        </p>
                        {isLast && (
                          <span className="mono rounded-full border border-[#00d9ff]/40 bg-[#00d9ff]/10 px-2 py-0.5 text-[8px] font-bold tracking-widest text-[#00d9ff]">
                            ● LIVE
                          </span>
                        )}
                      </div>

                      <p
                        className={`mt-1 max-w-md text-sm transition-colors duration-300 ${
                          isLast ? "text-zinc-200" : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {j.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ═══ 4 PILLARS ═══ */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {PILLARS.map(({ icon: Icon, title, desc }, idx) => (
                <SpotlightCard
                  key={title}
                  className="p-5"
                  style={{
                    opacity: rightInView ? 1 : 0,
                    transform: rightInView ? "translateY(0)" : "translateY(16px)",
                    transition: REDUCED_MOTION
                      ? "none"
                      : `opacity 0.6s ease ${0.2 + idx * 0.1}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.2 + idx * 0.1}s, border-color 0.4s ease, box-shadow 0.4s ease`,
                  }}
                >
                  {/* Corner brackets */}
                  <span className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l border-t border-[#00d9ff]/25 transition-colors duration-500 group-hover:border-[#00d9ff]/70" />
                  <span className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r border-[#00d9ff]/25 transition-colors duration-500 group-hover:border-[#00d9ff]/70" />

                  <div className="relative">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#00d9ff]/25 bg-[#00d9ff]/[0.06] text-cyan-300 transition-all duration-300 group-hover:border-[#00d9ff]/60 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(0,217,255,0.25)]">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{desc}</p>
                  </div>
                </SpotlightCard>
              ))}
            </div>

            {/* ═══ METRICS — count-up ═══ */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {METRICS.map((m, idx) => (
                <div
                  key={m.label}
                  className="group rounded-2xl border border-[#00d9ff]/12 bg-white/[0.02] p-4 text-center transition-all duration-300 hover:scale-[1.04] hover:border-[#00d9ff]/35"
                  style={{
                    opacity: rightInView ? 1 : 0,
                    transform: rightInView ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
                    transition: REDUCED_MOTION
                      ? "none"
                      : `opacity 0.6s ease ${0.3 + idx * 0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.3 + idx * 0.08}s, border-color 0.3s ease`,
                  }}
                >
                  <p className="font-mono text-2xl font-black text-[#00d9ff] drop-shadow-[0_0_12px_rgba(0,217,255,0.35)]">
                    <CountUp end={m.value} suffix={m.suffix} />
                  </p>
                  <p className="mono mt-1.5 text-[9px] uppercase tracking-widest text-zinc-600">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            {/* ═══ TECH STACK chips ═══ */}
            <SpotlightCard className="p-6">
              <div className="mb-4 font-mono text-[10px] tracking-[0.2em] text-cyan-600">
                $ ls ./daily_toolkit
              </div>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((tool, idx) => (
                  <span
                    key={tool}
                    className="mono cursor-default rounded-lg border border-zinc-800 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#00d9ff]/50 hover:bg-[#00d9ff]/10 hover:text-cyan-300"
                    style={{
                      opacity: rightInView ? 1 : 0,
                      transform: rightInView ? "translateY(0)" : "translateY(10px)",
                      transition: REDUCED_MOTION
                        ? "none"
                        : `opacity 0.4s ease ${0.3 + idx * 0.04}s, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${0.3 + idx * 0.04}s, border-color 0.3s ease, background 0.3s ease`,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </SpotlightCard>

            {/* ═══ PHILOSOPHY QUOTE ═══ */}
            <SpotlightCard className="p-6 md:p-7">
              <div className="pointer-events-none absolute -right-2 -top-4 select-none">
                <Quote className="h-20 w-20 text-cyan-500/[0.06]" strokeWidth={1} />
              </div>

              <p className="mono mb-3 text-[10px] tracking-[0.2em] text-cyan-600">
                $ cat philosophy.txt
              </p>

              <blockquote className="relative z-10 border-l-2 border-[#00d9ff]/40 pl-4">
                <p className="text-sm font-light leading-relaxed text-zinc-300">
                  "Talent is overrated. What you're looking at is{" "}
                  <span className="font-medium not-italic text-[#00d9ff]">2 AM debugging sessions</span>,
                  rebuilt layouts, and a hundred small decisions made with care. That's the whole secret."
                </p>
              </blockquote>

              <div className="relative z-10 mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#00d9ff]/30 bg-[#00d9ff]/[0.08] shadow-[0_0_14px_rgba(0,217,255,0.15)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </span>
                <div>
                  <p className="text-xs font-bold text-cyan-400">Mahak</p>
                  <p className="text-[10px] text-zinc-600">Web Developer — DevSpace by Mahak</p>
                </div>
                <span className="mono ml-auto text-[9px] tracking-widest text-zinc-700">
                  — SIGNATURE
                </span>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* ─── Bottom CTA strip ─── */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#00d9ff]/12 bg-white/[0.02] px-8 py-6 sm:flex-row">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Want the full story in a call?
            </p>
            <p className="mt-0.5 text-xs text-zinc-500">
              15 minutes — my work, your project, zero pressure.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={copyEmail}
              aria-label="Copy email"
              className={`mono flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] font-medium transition-all duration-300 ${
                copied
                  ? "border-[#00d9ff] bg-[#00d9ff] text-black"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white"
              }`}
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Email Copied" : EMAIL}
            </button>
            <a
              href="#contact"
              className="mono group flex items-center gap-2 rounded-lg bg-[#00d9ff] px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(0,217,255,0.25)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,217,255,0.5)]"
            >
              Let's Talk
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}