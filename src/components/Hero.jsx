import React, { useState, useEffect, useRef } from "react";

const PARTICLES = [
  { left: "4%",  size: 3, delay: "0s",    duration: "7s"  },
  { left: "11%", size: 2, delay: "1.2s",  duration: "9s"  },
  { left: "19%", size: 4, delay: "0.4s",  duration: "8s"  },
  { left: "27%", size: 2, delay: "2.1s",  duration: "10s" },
  { left: "35%", size: 3, delay: "0.8s",  duration: "7.5s"},
  { left: "44%", size: 2, delay: "1.6s",  duration: "9.5s"},
  { left: "53%", size: 4, delay: "0.2s",  duration: "8.5s"},
  { left: "61%", size: 2, delay: "2.6s",  duration: "11s" },
  { left: "69%", size: 3, delay: "1.1s",  duration: "7.8s"},
  { left: "77%", size: 2, delay: "0.6s",  duration: "9.2s"},
  { left: "85%", size: 4, delay: "1.9s",  duration: "8.2s"},
  { left: "92%", size: 2, delay: "0.3s",  duration: "10.5s"},
  { left: "8%",  size: 2, delay: "3.1s",  duration: "9.8s"},
  { left: "57%", size: 3, delay: "2.8s",  duration: "7.2s"},
];

const STARS = [
  { top: "12%", left: "18%", size: "10px", duration: "3.2s", delay: "0s"   },
  { top: "22%", left: "62%", size: "8px",  duration: "2.6s", delay: "0.6s" },
  { top: "8%",  left: "85%", size: "11px", duration: "3.8s", delay: "1.1s" },
  { top: "68%", left: "6%",  size: "9px",  duration: "3s",   delay: "0.3s" },
  { top: "78%", left: "48%", size: "7px",  duration: "2.8s", delay: "1.6s" },
  { top: "40%", left: "94%", size: "10px", duration: "3.4s", delay: "0.9s" },
  { top: "55%", left: "30%", size: "8px",  duration: "3.1s", delay: "2.1s" },
];

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const CountUp = ({ end, suffix = "", duration = 1600 }) => {
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

function Hero() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const btn1 = useRef(null);
  const btn2 = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.setProperty("--spot-x", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--spot-y", `${((e.clientY - r.top) / r.height) * 100}%`);
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el || REDUCED_MOTION) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--tx", (((e.clientY - r.top) / r.height - 0.5) * -12).toFixed(2));
      el.style.setProperty("--ty", (((e.clientX - r.left) / r.width - 0.5) * 12).toFixed(2));
    };
    const onLeave = () => {
      el.style.setProperty("--tx", "0");
      el.style.setProperty("--ty", "0");
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || REDUCED_MOTION) return;
    const ctx = canvas.getContext("2d");
    let raf, W, H;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -1e4, y: -1e4 };
    let pts = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor((W * H) / 20000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.5,
      }));
    };

    const LINK = 115;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(0,217,255,${(1 - d / LINK) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
        if (md < 150) {
          ctx.strokeStyle = `rgba(0,217,255,${(1 - md / 150) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          pts[i].x += (mouse.x - pts[i].x) * 0.002;
          pts[i].y += (mouse.y - pts[i].y) * 0.002;
        }
        ctx.fillStyle = "rgba(0,217,255,0.35)";
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = -1e4; mouse.y = -1e4; };

    resize();
    tick();
    window.addEventListener("resize", resize);
    sectionRef.current?.addEventListener("mousemove", onMove);
    sectionRef.current?.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      sectionRef.current?.removeEventListener("mousemove", onMove);
      sectionRef.current?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const magnetize = (el) => {
    if (!el || REDUCED_MOTION) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.transition = "transform 0.15s ease-out";
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${
        (e.clientY - r.top - r.height / 2) * 0.22
      }px)`;
    };
    const onLeave = () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  };

  useEffect(() => magnetize(btn1.current), []);
  useEffect(() => magnetize(btn2.current), []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-14 md:pb-20 px-4 sm:px-12 md:px-16 lg:px-24 relative overflow-hidden bg-gradient-to-b from-[#04070c] via-[#030509] to-[#04070c] text-white select-none font-sans"
    >
      <style>{`
        .neon-glow-card {
          border: 1px solid rgba(0, 217, 255, 0.25);
          background: rgba(4, 12, 20, 0.65);
          backdrop-filter: blur(16px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 217, 255, 0.08);
          transition: all 0.4s ease;
        }
        .neon-glow-card:hover {
          border-color: rgba(0, 217, 255, 0.65);
          transform: scale(1.08);
          box-shadow: 0 0 35px rgba(0, 217, 255, 0.35);
        }
        .neon-glow-btn {
          background: linear-gradient(90deg, #00b4d8, #00d9ff);
          box-shadow: 0 4px 25px rgba(0, 217, 255, 0.35);
          transition: all 0.3s ease;
        }
        .neon-glow-btn:hover {
          box-shadow: 0 0 35px rgba(0, 217, 255, 0.6);
          transform: translateY(-2px);
        }
        @keyframes blink { 50% { border-color: transparent; } }
        @keyframes floatNodes { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .animate-float-node { animation: floatNodes 4s ease-in-out infinite; }

        @keyframes driftBlobA {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.18; }
          33%  { transform: translate(40px, 30px) scale(1.15); opacity: 0.26; }
          66%  { transform: translate(-20px, 50px) scale(0.95); opacity: 0.14; }
        }
        @keyframes driftBlobB {
          0%, 100% { transform: translate(0,0) scale(1); opacity: 0.20; }
          50% { transform: translate(-50px, -35px) scale(1.2); opacity: 0.30; }
        }
        .animate-drift-a { animation: driftBlobA 14s ease-in-out infinite; }
        .animate-drift-b { animation: driftBlobB 18s ease-in-out infinite; }

        @keyframes gridPan { 0% { background-position: 0 0; } 100% { background-position: 0 80px; } }
        @keyframes gridPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.65; } }
        .bg-circuit-grid {
          background-image:
            linear-gradient(rgba(0,217,255,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,217,255,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridPan 9s linear infinite, gridPulse 6s ease-in-out infinite;
        }

        @keyframes particleRise {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.7; }
          85% { opacity: 0.5; }
          100% { transform: translateY(-160px) translateX(8px); opacity: 0; }
        }
        .particle-rise { animation-name: particleRise; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }

        @keyframes beamSweep {
          0% { transform: translateX(-60%) translateY(-60%) rotate(20deg); }
          100% { transform: translateX(60%) translateY(60%) rotate(20deg); }
        }
        .animate-beam-sweep { animation: beamSweep 10s linear infinite; }

        @keyframes spinSlow { to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 8s linear infinite; }
        .animate-spin-slower { animation: spinSlow 24s linear infinite; }
        .animate-spin-rev { animation: spinSlow 16s linear infinite reverse; }

        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.09); opacity: 0.85; }
        }
        .animate-breathe { animation: breathe 4.5s ease-in-out infinite; }

        @keyframes scanSweep {
          0% { transform: translateY(-120%); opacity: 0; }
          10% { opacity: 0.55; }
          90% { opacity: 0.4; }
          100% { transform: translateY(220%); opacity: 0; }
        }
        .animate-scan-sweep { animation: scanSweep 5s ease-in-out infinite; }

        @keyframes fadeUpIn {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-entrance { animation: fadeUpIn 0.85s cubic-bezier(.22,1,.36,1) both; }

        @keyframes headGlow {
          0%, 100% { filter: drop-shadow(0 10px 30px rgba(0,217,255,0.15)); }
          50% { filter: drop-shadow(0 10px 48px rgba(0,217,255,0.35)); }
        }
        @keyframes glitch-flicker {
          0%, 91%, 94%, 98%, 100% { opacity: 1; }
          92% { opacity: 0.6; }
          96% { opacity: 0.8; }
        }
        .animate-studio-glow {
          animation: headGlow 4s ease-in-out infinite, glitch-flicker 7s linear infinite;
        }

        .neon-text {
          color: #00d9ff;
          text-shadow: 0 0 12px rgba(0, 217, 255, 0.5);
        }

        @keyframes twinkleStar {
          0%, 100% { opacity: 0.15; transform: scale(0.7) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(15deg); }
        }
        .twinkle-star { animation-name: twinkleStar; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }

        @keyframes buttonShine { 0% { transform: translateX(-150%) skewX(-20deg); } 100% { transform: translateX(250%) skewX(-20deg); } }
        .animate-button-shine { animation: buttonShine 3.2s ease-in-out infinite; }

        @keyframes softPulse {
          0%, 100% { box-shadow: 0 0 0px rgba(0,217,255,0); }
          50% { box-shadow: 0 0 18px rgba(0,217,255,0.25); }
        }
        .animate-soft-pulse { animation: softPulse 3.6s ease-in-out infinite; }

        @keyframes whiteRingPulse { 0%, 100% { opacity: 0.16; } 50% { opacity: 0.38; } }
        .animate-white-ring { animation: whiteRingPulse 4s ease-in-out infinite; }

        @keyframes cornerPulse { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        .animate-corner { animation: cornerPulse 2.6s ease-in-out infinite; }

        .tilt-frame {
          transform: perspective(1000px) rotateX(calc(var(--tx, 0) * 1deg)) rotateY(calc(var(--ty, 0) * 1deg));
          transition: transform 0.15s ease-out;
          will-change: transform;
        }
        .tilt-glare {
          background: radial-gradient(
            circle at calc(50% + var(--ty, 0) * 2.2%) calc(50% - var(--tx, 0) * 2.2%),
            rgba(255,255,255,0.16),
            transparent 55%
          );
        }

        .parallax-a {
          transform: translate3d(calc(var(--px, 0) * 14px), calc(var(--py, 0) * 10px), 0);
          transition: transform 0.4s ease-out;
        }
        .parallax-b {
          transform: translate3d(calc(var(--px, 0) * -12px), calc(var(--py, 0) * -9px), 0);
          transition: transform 0.4s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-drift-a, .animate-drift-b, .bg-circuit-grid, .animate-beam-sweep,
          .animate-spin-slow, .animate-spin-slower, .animate-spin-rev, .animate-breathe, .animate-scan-sweep,
          .animate-studio-glow, .twinkle-star, .animate-button-shine,
          .animate-soft-pulse, .animate-white-ring, .animate-corner, .animate-float-node,
          .particle-rise { animation: none !important; }
          .tilt-frame { transform: none !important; }
        }
      `}</style>

      {/* ── Corner meta labels ── */}
      <span className="absolute left-4 top-24 mono text-[9px] tracking-widest text-cyan-600/50 z-10 hidden lg:block">[ 01 — STUDIO ]</span>
      <span className="absolute right-4 top-24 mono text-[9px] tracking-widest text-cyan-600/50 z-10 hidden lg:block">[ PORTFOLIO // v2.4 ]</span>

      {/* ── Cursor spotlight ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0 hidden md:block"
        style={{ background: `radial-gradient(circle at var(--spot-x, 50%) var(--spot-y, 40%), rgba(0,217,255,0.10), transparent 32%)` }}
      />

      {/* ── Neon nebula blobs ── */}
      <div className="parallax-a absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-5%] left-[-10%] w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full blur-[130px] mix-blend-screen animate-drift-a"
          style={{ background: "radial-gradient(circle, rgba(0,217,255,0.18), transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[450px] sm:w-[850px] h-[450px] sm:h-[850px] rounded-full blur-[150px] animate-drift-b"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.16), transparent 70%)" }}
        />
      </div>

      <div className="absolute inset-0 bg-circuit-grid opacity-40 pointer-events-none z-0" />

      <div
        className="absolute inset-[-50%] pointer-events-none z-0 animate-beam-sweep"
        style={{ background: "linear-gradient(100deg, transparent 45%, rgba(0,217,255,0.06) 50%, transparent 55%)" }}
      />

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle-rise absolute rounded-full bg-cyan-400"
            style={{
              left: p.left, bottom: "-10px", width: `${p.size}px`, height: `${p.size}px`,
              boxShadow: "0 0 6px rgba(0,217,255,0.8)",
              animationDelay: p.delay, animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="parallax-b absolute inset-0 pointer-events-none z-0 overflow-hidden hidden sm:block">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="twinkle-star absolute text-cyan-300"
            style={{
              top: s.top, left: s.left, fontSize: s.size,
              animationDuration: s.duration, animationDelay: s.delay,
              textShadow: "0 0 8px rgba(0,217,255,0.8)",
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 h-full w-full [mask-image:radial-gradient(ellipse_75%_70%_at_50%_45%,black,transparent)]"
      />

      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)" }}
      />

      {/* ═══════════ CONTENT ═══════════ */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-12 items-center relative z-10">

        {/* ═══════════ LEFT — STUDIO COPY ═══════════ */}
        <div className="flex flex-col items-start space-y-4 md:space-y-6">

          <div className="animate-entrance inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06121c]/60 border border-[#00d9ff]/30 backdrop-blur-md" style={{ animationDelay: "0.05s" }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            <span className="text-cyan-300 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">
              // Elite Web Development Studio
            </span>
          </div>

          <h1 className="animate-studio-glow w-full font-display font-extrabold uppercase leading-[0.95] tracking-tight">
            <span className="block text-5xl text-white sm:text-6xl lg:text-7xl">
              Pixel-Perfect
            </span>
            <span className="text-outline-strong block text-5xl sm:text-6xl lg:text-7xl">
              Interfaces
            </span>
            <span className="block text-5xl text-white sm:text-6xl lg:text-7xl">
              That <span className="neon-text">Convert.</span>
            </span>
          </h1>

          <p className="mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
            Engineering front-end layers for modern brands
          </p>

          <p className="animate-entrance text-cyan-100/70 text-sm sm:text-base leading-relaxed max-w-xl font-light tracking-wide" style={{ animationDelay: "0.30s" }}>
            Turning complex architectural designs into{" "}
            <span className="text-cyan-400 font-medium">lightning-fast, production-ready web spaces</span>.
            No slow page builders. Just{" "}
            <span className="text-white font-medium">clean, optimized component structures</span>{" "}
            built to scale modern businesses.
          </p>

          <div className="animate-entrance w-full max-w-xl rounded-xl border border-[#00d9ff]/25 bg-black/90 p-3.5 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.9)]" style={{ animationDelay: "0.36s" }}>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#00d9ff]/15 text-zinc-500 text-[9px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
                <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                <span className="ml-2 font-mono">devspace ~ zsh</span>
              </span>
              <span className="font-mono">online</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-cyan-400">
              <span className="font-bold">✦</span>
              <span className="truncate text-cyan-200">system --mode=elite --status=production-ready</span>
              <span
                className="inline-block h-3 w-[2px] shrink-0 bg-cyan-400"
                style={{ animation: REDUCED_MOTION ? "none" : "blink 1s step-end infinite" }}
              />
            </div>
          </div>

          <div className="animate-entrance flex flex-wrap gap-3 sm:gap-4 pt-2 w-full" style={{ animationDelay: "0.42s" }}>
            <a ref={btn1} href="#projects" className="neon-glow-btn relative overflow-hidden px-6 sm:px-7 py-3.5 rounded-xl text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
              <span className="absolute top-0 left-0 h-full w-1/3 animate-button-shine pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)" }} />
              <span className="relative z-10">Explore Featured Work →</span>
            </a>

            <a ref={btn2} href="#contact" className="animate-soft-pulse px-6 sm:px-7 py-3.5 rounded-xl border border-[#00d9ff]/30 bg-[#00d9ff]/[0.04] text-cyan-300 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:border-[#00d9ff]/60 hover:bg-[#00d9ff]/10 transition-all duration-300">
              Schedule a Discovery Call
            </a>
          </div>

          <div className="animate-entrance grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-[#00d9ff]/15 w-full max-w-md" style={{ animationDelay: "0.54s" }}>
            <div>
              <p className="text-2xl sm:text-3xl font-black font-mono text-white">
                <CountUp end={20} suffix="+" />
              </p>
              <p className="text-cyan-600 text-[10px] tracking-widest uppercase mt-1">Projects</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 drop-shadow-[0_0_15px_rgba(0,217,255,0.35)]">100%</p>
              <p className="text-cyan-600 text-[10px] tracking-widest uppercase mt-1">On-Time</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black font-mono text-white">∞</p>
              <p className="text-cyan-600 text-[10px] tracking-widest uppercase mt-1">Passion</p>
            </div>
          </div>
        </div>

        {/* ═══════════ RIGHT — BIG FANCY FRAME ═══════════ */}
        <div className="flex justify-center items-center pt-10 pb-4 lg:pt-0 lg:pb-0 animate-entrance" style={{ animationDelay: "0.3s" }}>
          <div
            ref={frameRef}
            className="tilt-frame relative w-[85vw] max-w-[300px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] aspect-square mx-auto"
          >
            {/* Breathing glow */}
            <div
              className="absolute inset-2 rounded-[2.8rem] pointer-events-none animate-breathe z-0"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(0,217,255,0.32) 38%, transparent 70%)",
                filter: "blur(28px)",
              }}
            />

            <div
              className="absolute -inset-2 rounded-[3rem] pointer-events-none animate-spin-rev z-0 opacity-40"
              style={{
                background: "conic-gradient(from 180deg, transparent 0%, rgba(56,189,248,0.5) 10%, transparent 25%, transparent 70%, rgba(0,217,255,0.4) 88%, transparent 100%)",
                filter: "blur(6px)",
              }}
            />

            <div
              className="absolute inset-3 sm:inset-4 rounded-[2.6rem] pointer-events-none animate-spin-slow z-[1]"
              style={{
                background: "conic-gradient(from 0deg, transparent 0%, rgba(0,217,255,0.9) 12%, transparent 28%, transparent 65%, rgba(56,189,248,0.7) 80%, transparent 100%)",
                filter: "blur(3px)",
              }}
            />

            <div
              className="animate-white-ring absolute inset-5 sm:inset-[1.1rem] rounded-[2.55rem] pointer-events-none z-[2]"
              style={{ border: "1.5px solid rgba(255,255,255,0.5)" }}
            />

            <div className="absolute inset-0 animate-spin-slower pointer-events-none z-30" aria-hidden="true">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(0,217,255,1)]" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
            </div>

            <div className="absolute inset-6 rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-[#06121c] to-[#030509] p-3 shadow-[0_0_60px_rgba(0,140,180,0.25)] overflow-hidden z-10">
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-zinc-950 relative border border-white/10">
                <img
                  src="/images/mahak-hero.png"
                  alt="Mahak — Web Developer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04070c]/90 via-transparent to-black/10 pointer-events-none" />

                <div
                  className="absolute left-0 right-0 h-1/3 pointer-events-none animate-scan-sweep"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(0,217,255,0.4), transparent)", mixBlendMode: "screen" }}
                />
              </div>

              <div className="tilt-glare absolute inset-0 rounded-[2.5rem] pointer-events-none z-20 mix-blend-overlay" />
            </div>

            {[
              { pos: "top-3 left-3", align: "top-0 left-0", delay: "0s" },
              { pos: "top-3 right-3", align: "top-0 right-0", delay: "0.6s" },
              { pos: "bottom-3 left-3", align: "bottom-0 left-0", delay: "1.2s" },
              { pos: "bottom-3 right-3", align: "bottom-0 right-0", delay: "1.8s" },
            ].map((c, i) => (
              <div key={i} className={`absolute ${c.pos} w-6 h-6 z-30 pointer-events-none animate-corner`} style={{ animationDelay: c.delay }}>
                <span className={`absolute ${c.align} w-5 h-[2.5px] bg-white rounded-full`} style={{ boxShadow: "0 0 8px rgba(255,255,255,0.7)" }} />
                <span className={`absolute ${c.align} w-[2.5px] h-5 bg-white rounded-full`} style={{ boxShadow: "0 0 8px rgba(255,255,255,0.7)" }} />
              </div>
            ))}

            <div className="absolute -left-8 -top-8 z-40 hidden sm:flex h-28 w-28 items-center justify-center">
              <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slower">
                <defs>
                  <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text className="mono" fill="rgba(0,217,255,0.85)" fontSize="8.5" letterSpacing="2.5">
                  <textPath href="#circlePath">OPEN TO WORK • LET'S BUILD •</textPath>
                </text>
              </svg>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#00d9ff]/40 bg-[#05070a] shadow-[0_0_20px_rgba(0,217,255,0.3)]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              </span>
            </div>

            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20 animate-float-node">
              <div className="neon-glow-card rounded-xl p-2.5 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16">
                <span className="text-lg">⚛️</span>
                <span className="text-[9px] font-bold text-cyan-400 tracking-wider mt-1 uppercase">React</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
              <div className="neon-glow-card rounded-xl px-4 py-1.5 flex flex-col items-center justify-center border-cyan-400/40">
                <span className="text-[8px] font-bold tracking-widest text-cyan-400 uppercase">Web</span>
                <span className="text-[10px] font-bold text-white tracking-wide">Developer</span>
              </div>
            </div>

            <div className="hidden sm:block absolute right-0 top-[40%] transform translate-y-[-50%] z-20 animate-float-node" style={{ animationDelay: "-1s" }}>
              <div className="neon-glow-card rounded-xl p-2.5 flex flex-col items-center justify-center w-16 h-16">
                <span className="text-lg">⚡</span>
                <span className="text-[9px] font-bold text-cyan-400 tracking-wider mt-1 uppercase">Next.js</span>
              </div>
            </div>

            <div className="hidden sm:block absolute right-2 bottom-12 z-20 animate-float-node" style={{ animationDelay: "-2s" }}>
              <div className="neon-glow-card rounded-xl p-2.5 flex flex-col items-center justify-center w-16 h-16">
                <span className="text-cyan-400 font-black text-sm">TS</span>
                <span className="text-[8px] font-medium text-cyan-500 tracking-tight mt-1 uppercase">Typescript</span>
              </div>
            </div>

            <div className="hidden sm:block absolute left-2 bottom-12 z-20 animate-float-node" style={{ animationDelay: "-1.5s" }}>
              <div className="neon-glow-card rounded-xl p-2.5 flex flex-col items-center justify-center w-16 h-16">
                <span className="text-cyan-400 font-black text-sm">JS</span>
                <span className="text-[9px] font-bold text-cyan-400 tracking-wider mt-1 uppercase">Javascript</span>
              </div>
            </div>

            <div className="hidden sm:block absolute left-0 top-[40%] transform translate-y-[-50%] z-20 animate-float-node" style={{ animationDelay: "-0.5s" }}>
              <div className="neon-glow-card rounded-xl p-2.5 flex flex-col items-center justify-center w-16 h-16">
                <span className="text-lg">🎨</span>
                <span className="text-[8px] font-bold text-cyan-400 tracking-tight mt-1 uppercase">Figma</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 animate-entrance" style={{ animationDelay: "0.7s" }}>
        <span className="text-cyan-500/50 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-cyan-400/30 flex justify-center pt-1.5">
          <span className="w-1 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export default Hero;