import React, { useEffect, useRef, useState } from "react";

/* ---------------------------------- Data ----------------------------------- */

const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Website",
    category: "react",
    tech: ["React", "Tailwind CSS", "Context API"],
    description: "A fully responsive e-commerce platform with product filtering, cart functionality, and checkout process.",
    emoji: "🛒",
    liveLink: "https://e-commerce-app-eta-dun.vercel.app/",
    githubLink: "https://github.com/Mahak-012/e-commerce-app",
    featured: true,
  },
  {
    id: 2,
    title: "STUDIO.CORE — Agency Build",
    category: "react",
    tech: ["React", "Tailwind CSS", "Canvas API"],
    description: "A cinematic dark-themed agency landing platform featuring interactive particle constellations, aurora lighting systems, 3D tilt cards, and hand-crafted motion design — zero animation libraries.",
    emoji: "⚡",
    liveLink: "https://studio-core-agency-build.vercel.app/",
    githubLink: "https://github.com/Mahak-012/studio-core-agency-build",
    featured: true,
  },
  {
    id: 3,
    title: "Movie Search App",
    category: "react",
    tech: ["React", "REST API", "Tailwind CSS"],
    description: "A dynamic app to search for movies, view details, and ratings using a real-time movie database API.",
    emoji: "🎬",
    liveLink: "https://movie-search-app-pi-neon.vercel.app/",
    githubLink: "https://github.com/Mahak-012/movie-search-app",
  },
  {
    id: 4,
    title: "Job Portal UI",
    category: "react",
    tech: ["React", "React Router", "Tailwind CSS"],
    description: "A professional job portal application featuring job listings, detailed views, company profiles, and user dashboard.",
    emoji: "💼",
    liveLink: "https://job-portal-ui-six.vercel.app/",
    githubLink: "https://github.com/Mahak-012/job-portal-ui",
  },
  {
    id: 5,
    title: "Institute Website",
    category: "html-css",
    tech: ["HTML5", "CSS3", "JavaScript"],
    description: "A professional and responsive website for an educational institute with courses and contact details.",
    emoji: "🏫",
    liveLink: "https://techstem-technologies.vercel.app/",
    githubLink: "https://github.com/Mahak-012/Techstem-Technologies",
  },
  {
    id: 6,
    title: "Online Course Landing Page",
    category: "html-css",
    tech: ["HTML5", "Tailwind CSS", "Responsive Design"],
    description: "A modern, high-converting landing page for an online course with smooth scroll and appealing UI.",
    emoji: "📚",
    liveLink: "https://online-course-landing-page-eight.vercel.app/",
    githubLink: "https://github.com/Mahak-012/online-course-landing-page",
  },
  {
    id: 7,
    title: "Dental Clinic Website",
    category: "html-css",
    tech: ["HTML5", "Tailwind CSS", "Responsive Design"],
    description: "A professional, modern and fully responsive dental clinic website with service details and appointment booking.",
    emoji: "🦷",
    liveLink: "https://dental-clinic-seven-iota.vercel.app/",
    githubLink: "https://github.com/Mahak-012/dental-clinic",
  },
  {
    id: 8,
    title: "Veylora Fine Dining",
    category: "react",
    tech: ["React", "Tailwind CSS", "Responsive Design"],
    description: "A modern, elegant, and fully responsive web application for a luxury fine dining restaurant featuring a bento grid, interactive menu, and reservation system.",
    emoji: "🍷",
    liveLink: "https://veylora-the-fine-dining.vercel.app/",
    githubLink: "https://github.com/Mahak-012/Veylora-the-fine-dining",
    featured: true,
  },
  {
    id: 9,
    title: "To Do App (Mobile)",
    category: "react",
    tech: ["React Native", "Expo", "AsyncStorage"],
    description: "A cross-platform mobile task manager with categories, stats, and theme toggle. Available on GitHub for mobile testing.",
    emoji: "📱",
    liveLink: "#",
    githubLink: "https://github.com/Mahak-012/My-TO-DO-App",
    isMobile: true,
  },
];

const FILTERS = [
  { id: "all", label: "All Projects" },
  { id: "react", label: "React" },
  { id: "html-css", label: "HTML/CSS" },
  { id: "js", label: "JavaScript" },
];

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------- Helpers ---------------------------------- */

const getDomain = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "mobile-app";
  }
};

const matchesFilter = (p, filter) => {
  if (filter === "all") return true;
  if (filter === "js") return p.tech.some((t) => t.toLowerCase().includes("javascript"));
  return p.category === filter;
};

/* --------------------------------- Hook ------------------------------------- */

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

/* ------------------------------ Project Card --------------------------------- */

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView(0.12);
  const cardRef = useRef(null);

  /* Tilt + spotlight — CSS vars, zero re-renders */
  useEffect(() => {
    const el = cardRef.current;
    if (!el || REDUCED_MOTION) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--tx", ((0.5 - py) * 5).toFixed(2));
      el.style.setProperty("--ty", ((px - 0.5) * 5).toFixed(2));
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
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

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: REDUCED_MOTION ? "0s" : `${(index % 3) * 110}ms` }}
    >
      <div
        ref={cardRef}
        className="proj-card group relative h-full rounded-2xl p-px transition-shadow duration-500 hover:shadow-2xl hover:shadow-cyan-950/60"
      >
        {/* Gradient border */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-[#00d9ff]/30 via-[#00d9ff]/[0.07] to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="proj-card-inner relative flex h-full flex-col overflow-hidden rounded-2xl bg-[#04121a]">
          {/* Cursor spotlight */}
          <div className="proj-spotlight pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* ─── Preview ─── */}
          <div className="relative h-52 overflow-hidden border-b border-[#00d9ff]/10">
            {/* Browser chrome */}
            <div className="relative z-10 flex h-8 items-center gap-2 border-b border-[#00d9ff]/10 bg-[#06121c]/60 px-3 backdrop-blur">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#00d9ff]/60" />
                <span className="h-2 w-2 rounded-full bg-zinc-800" />
                <span className="h-2 w-2 rounded-full bg-zinc-800" />
              </div>
              <div className="ml-1 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-[#00d9ff]/15 bg-black/80 px-2 py-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-2.5 w-2.5 shrink-0 text-[#00d9ff]/70">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <span className="truncate font-mono text-[9px] text-[#00d9ff]/70">
                  {getDomain(project.liveLink)}
                </span>
              </div>
              {/* LIVE pulse */}
              <span className="flex shrink-0 items-center gap-1 font-mono text-[8px] tracking-widest text-cyan-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </span>
                LIVE
              </span>
            </div>

            {/* Preview area — wireframe + icon */}
            <div className="relative h-[calc(100%-2rem)] overflow-hidden bg-gradient-to-br from-[#06121c]/70 via-[#030509] to-[#06121c]/50">
              {/* Grid */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,217,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.05) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                }}
              />

              {/* Mini wireframe skeleton (website blueprint feel) */}
              <div className="proj-wireframe absolute inset-0 p-5 pt-7 opacity-60">
                <div className="flex h-full flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="proj-skel h-2 w-16 rounded-full" />
                    <div className="flex gap-1.5">
                      <div className="proj-skel h-2 w-6 rounded-full" />
                      <div className="proj-skel h-2 w-6 rounded-full" />
                      <div className="proj-skel h-2 w-6 rounded-full" />
                    </div>
                  </div>
                  <div className="proj-skel mt-1 h-3 w-3/4 rounded-full" />
                  <div className="proj-skel h-2 w-1/2 rounded-full" />
                  <div className="mt-auto grid grid-cols-3 gap-2 pb-1">
                    <div className="proj-skel h-10 rounded-lg" />
                    <div className="proj-skel h-10 rounded-lg" />
                    <div className="proj-skel h-10 rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Ambient blobs */}
              <div className="proj-blob-a absolute h-28 w-28 rounded-full bg-[#00d9ff]/20 blur-2xl" />
              <div className="proj-blob-b absolute h-24 w-24 rounded-full bg-sky-400/15 blur-2xl" />

              {/* Center icon — glass circle */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="proj-icon-ring flex h-20 w-20 items-center justify-center rounded-2xl border border-[#00d9ff]/25 bg-[#04121a]/80 shadow-[0_0_40px_rgba(0,217,255,0.25)] backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-[#00d9ff]/60 group-hover:shadow-[0_0_55px_rgba(0,217,255,0.45)]">
                  <span className="proj-float text-4xl drop-shadow-[0_0_18px_rgba(0,217,255,0.5)]">
                    {project.emoji}
                  </span>
                </div>
              </div>

              {/* Hover overlay + CTA */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-[#030509]/95 via-[#030509]/70 to-[#030509]/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-400 group-hover:opacity-100">
                <a
                  href={project.liveLink !== "#" ? project.liveLink : project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-open-btn translate-y-4 rounded-xl px-6 py-3 text-sm font-bold text-[#030509] shadow-2xl shadow-cyan-500/40 transition-transform duration-400 group-hover:translate-y-0"
                >
                  {project.liveLink !== "#" ? "Open Project ↗" : "View on GitHub ↗"}
                </a>
                <span className="translate-y-4 font-mono text-[9px] tracking-[0.25em] text-cyan-300/80 transition-transform delay-75 duration-400 group-hover:translate-y-0">
                  {project.liveLink !== "#" ? "LIVE DEPLOYMENT" : "SOURCE CODE"}
                </span>
              </div>

              {/* Mobile badge */}
              {project.isMobile && (
                <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full border border-[#00d9ff]/30 bg-[#04121a]/90 px-2.5 py-1 font-mono text-[9px] tracking-widest text-cyan-400 backdrop-blur">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-2.5 w-2.5">
                    <rect x="6" y="2" width="12" height="20" rx="2" />
                    <path d="M12 18h.01" />
                  </svg>
                  MOBILE APP
                </div>
              )}
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute left-3 top-11 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-300 px-2.5 py-1 text-[9px] font-bold tracking-widest text-[#030509] shadow-lg shadow-cyan-500/40">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5">
                  <path d="M12 2l2.9 6.26L21.5 9.27l-4.75 4.63 1.12 6.53L12 17.31l-5.87 3.12 1.12-6.53L2.5 9.27l6.6-1.01L12 2z" />
                </svg>
                FEATURED
              </div>
            )}
          </div>

          {/* ─── Content ─── */}
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-cyan-600">
                <span className="h-px w-5 bg-gradient-to-r from-[#00d9ff] to-transparent" />
                PROJECT_{String(project.id).padStart(2, "0")}
              </div>
              <span className="font-mono text-[9px] text-cyan-700">/ 2025</span>
            </div>

            <h3 className="text-lg font-bold text-cyan-300 transition-colors duration-300 group-hover:text-white md:text-xl">
              {project.title}
            </h3>

            <p className="mt-2 mb-4 flex-1 text-xs leading-relaxed text-zinc-400 sm:text-sm">
              {project.description}
            </p>

            {/* Tech tags */}
            <div className="mb-5 flex flex-wrap gap-2">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-[#00d9ff]/15 bg-[#00d9ff]/[0.07] px-2 py-0.5 text-[10px] font-medium text-cyan-300/80 transition-colors duration-300 group-hover:border-[#00d9ff]/35 sm:text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (project.liveLink === "#") {
                    e.preventDefault();
                    alert("📱 This is a Mobile App! Available for testing on mobile devices. Check the GitHub repo for instructions.");
                  }
                }}
                className="proj-btn relative flex-1 overflow-hidden rounded-lg py-1.5 text-center text-xs font-semibold text-white sm:text-sm"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full skew-x-[-12deg]" />
                <span className="relative">Live Demo →</span>
              </a>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[#00d9ff]/30 bg-[#00d9ff]/[0.05] px-3 py-1.5 text-xs font-semibold text-cyan-400 transition-all duration-300 hover:scale-105 hover:border-[#00d9ff]/60 hover:bg-[#00d9ff]/10 hover:text-cyan-300 sm:text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --------------------------------- Section ----------------------------------- */

function Projects() {
  const [filter, setFilter] = useState("all");
  const [headRef, headInView] = useInView(0.3);

  const filteredProjects = PROJECTS.filter((p) => matchesFilter(p, filter));
  const countFor = (id) => PROJECTS.filter((p) => matchesFilter(p, id)).length;

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-20 px-6 sm:px-10 md:py-28 md:px-14 lg:px-20"
      style={{ background: "linear-gradient(135deg,#030609 0%, #04101a 50%, #030609 100%)" }}
    >
      <style>{`
        .projects-heading { display: flex; flex-direction: column; align-items: center; }

        .proj-card {
          transform: perspective(1100px) rotateX(calc(var(--tx, 0) * 1deg)) rotateY(calc(var(--ty, 0) * 1deg));
          transition: transform 0.2s ease-out, box-shadow 0.5s ease;
          will-change: transform;
        }
        .proj-card:hover {
          transform: perspective(1100px) rotateX(calc(var(--tx, 0) * 1deg)) rotateY(calc(var(--ty, 0) * 1deg)) translateY(-8px);
        }
        .proj-card-inner { background: rgba(4, 18, 26, 0.92); }
        .proj-spotlight {
          background: radial-gradient(
            360px circle at var(--mx, 50%) var(--my, 50%),
            rgba(0, 217, 255, 0.1),
            transparent 65%
          );
        }

        /* Wireframe skeleton shimmer */
        @keyframes projSkel {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.7; }
        }
        .proj-skel {
          background: rgba(0, 217, 255, 0.12);
          border: 1px solid rgba(0, 217, 255, 0.1);
          animation: projSkel 3.5s ease-in-out infinite;
        }
        .proj-wireframe { transition: opacity 0.4s ease, transform 0.5s ease; }
        .proj-card:hover .proj-wireframe {
          opacity: 1;
          transform: scale(1.03);
        }

        @keyframes projBlobA {
          0%, 100% { transform: translate(-30%, -20%) scale(1); }
          50% { transform: translate(20%, 15%) scale(1.2); }
        }
        @keyframes projBlobB {
          0%, 100% { transform: translate(30%, 20%) scale(1); }
          50% { transform: translate(-20%, -15%) scale(1.15); }
        }
        .proj-blob-a { top: 10%; left: 10%; animation: projBlobA 10s ease-in-out infinite; }
        .proj-blob-b { bottom: 10%; right: 10%; animation: projBlobB 13s ease-in-out infinite; }

        @keyframes projFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .proj-float { animation: projFloat 4s ease-in-out infinite; }

        .proj-open-btn { background: linear-gradient(135deg, #38bdf8, #00d9ff); }
        .proj-open-btn:hover { transform: scale(1.05); }

        .proj-btn {
          background: linear-gradient(135deg, #00d9ff, #0891b2);
          box-shadow: 0 4px 20px rgba(0, 217, 255, 0.25);
          transition: all 0.3s ease;
        }
        .proj-btn:hover {
          box-shadow: 0 0 30px rgba(0, 217, 255, 0.5);
          transform: translateY(-1px) scale(1.02);
        }

        @media (prefers-reduced-motion: reduce) {
          .proj-card, .proj-card:hover { transform: none !important; }
          .proj-blob-a, .proj-blob-b, .proj-float, .proj-skel { animation: none !important; }
        }
      `}</style>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#00d9ff]/[0.06] blur-[130px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* ─── Section Heading ─── */}
        <div
          ref={headRef}
          className={`projects-heading mb-10 text-center transition-all duration-700 ease-out md:mb-14 ${
            headInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan-500">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400" />
            <span>// Portfolio</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h2 className="text-3xl font-black sm:text-4xl md:text-6xl">
            <span
              className="inline-block pb-2"
              style={{
                background: "linear-gradient(135deg,#00d9ff,#7dd3fc,#00d9ff)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              My Projects
            </span>
          </h2>

          <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-[#00d9ff] to-sky-400 shadow-[0_0_14px_rgba(0,217,255,0.6)]" />

          <p className="mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Real, deployed, production-grade builds —{" "}
            <span className="text-cyan-300">hover any card</span> to peek inside 👀
          </p>
        </div>

        {/* ─── Filter Buttons ─── */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3 md:mb-12">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 sm:px-5 sm:py-2 sm:text-sm ${
                  active ? "scale-105 text-white" : "text-cyan-300/70 hover:scale-105 hover:text-cyan-200"
                }`}
                style={{
                  background: active ? "linear-gradient(135deg,#00d9ff,#0891b2)" : "rgba(0,217,255,0.08)",
                  border: active ? "none" : "1px solid rgba(0,217,255,0.2)",
                  boxShadow: active ? "0 0 20px rgba(0,217,255,0.35)" : "none",
                }}
              >
                {f.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] leading-none ${
                    active ? "bg-white/20 text-white" : "bg-[#00d9ff]/10 text-cyan-500"
                  }`}
                >
                  {countFor(f.id)}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── Grid ─── */}
        {filteredProjects.length > 0 ? (
          <div key={filter} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#00d9ff]/20 py-16 text-center">
            <span className="text-5xl opacity-40">🔍</span>
            <p className="mt-4 font-mono text-sm text-cyan-500/60">// no projects in this category yet</p>
            <button
              onClick={() => setFilter("all")}
              className="mt-5 rounded-lg border border-[#00d9ff]/30 bg-[#00d9ff]/[0.05] px-5 py-2 text-xs font-semibold text-cyan-300 transition-all duration-300 hover:border-cyan-400/60 hover:bg-[#00d9ff]/10"
            >
              View All Projects →
            </button>
          </div>
        )}

        {/* ─── Stats strip ─── */}
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 divide-x divide-[#00d9ff]/10 rounded-2xl border border-[#00d9ff]/10 bg-[#00d9ff]/[0.03] py-5 text-center backdrop-blur-sm">
          {[
            { v: `${PROJECTS.length}`, l: "Deployed Builds" },
            { v: "100%", l: "Responsive" },
            { v: "24/7", l: "Live on Vercel" },
          ].map((s) => (
            <div key={s.l}>
              <div className="bg-gradient-to-b from-white to-cyan-300/70 bg-clip-text text-xl font-black text-transparent sm:text-2xl">
                {s.v}
              </div>
              <div className="mt-1 text-[9px] uppercase tracking-widest text-cyan-600/70 sm:text-[10px]">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        {/* ─── View More ─── */}
        <div className="mt-10 text-center md:mt-12">
          <a
            href="https://github.com/Mahak-012?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/45"
            style={{ background: "linear-gradient(135deg,#00d9ff,#0891b2)" }}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full skew-x-[-12deg]" />
            <span className="relative">Explore Full Archive on GitHub</span>
            <span className="relative transition-transform duration-300 group-hover:translate-x-1">🚀</span>
          </a>
          <p className="mt-3 font-mono text-[10px] tracking-widest text-cyan-600/50">
            MORE EXPERIMENTS · FORKS · OPEN SOURCE
          </p>
        </div>
      </div>
    </section>
  );
}

export default Projects;