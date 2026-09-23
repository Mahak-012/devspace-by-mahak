import { useRef } from "react";
import {
  ArrowUpRight, Check, Clock, Zap, Shield, Infinity as InfinityIcon,
  Rocket, ShoppingBag, Gauge,
} from "lucide-react";

/* ------------------------------- Data -------------------------------------- */

const PACKAGES = [
  {
    id: 1,
    tag: "01 / LAUNCH",
    icon: Rocket,
    title: "Custom Front-End Engineering",
    tagline: "High-performance modular development.",
    price: "$350+",
    timeline: "3–5 Days",
    desc: "Translating highly complex Figma, Adobe XD, or custom product blueprints into production-ready, bulletproof responsive layouts. Every build utilizes clean code metrics, semantic HTML structures, and reusable framework components designed to support fast-scaling product platforms.",
    features: [
      "Figma/Design to Pixel-Perfect Deployment",
      "Modular Component & Architecture Design",
      "Cross-Device Mobile-First Testing",
    ],
    cta: "Start Engineering",
    featured: false,
  },
  {
    id: 2,
    tag: "02 / SCALE",
    icon: ShoppingBag,
    title: "E-Commerce Storefronts & Portals",
    tagline: "Conversion-optimized user experiences.",
    price: "$600+",
    timeline: "7–10 Days",
    desc: "Developing lightning-fast digital storefronts and responsive application dashboards built around the user path. By integrating fluid filtering logic, reactive state behaviors, and interactive dynamic components, I eliminate layout bottlenecks and optimize user retention metrics.",
    features: [
      "Dynamic Product & Inventory Grids",
      "Frictionless State-Driven Basket UI",
      "Asynchronous REST API Core Integrations",
    ],
    cta: "Scale My Storefront",
    featured: true,
  },
  {
    id: 3,
    tag: "03 / OPTIMIZE",
    icon: Gauge,
    title: "Performance & Re-Architecture",
    tagline: "Eliminating high bounce rates.",
    price: "$900+",
    timeline: "10–14 Days",
    desc: "Re-engineering outdated, slow, or broken template-based web environments. I specialize in asset bundle optimization, restructuring layout grids for layout-shift prevention, and maximizing overall rendering velocities to push Google PageSpeed benchmarks to 95+.",
    features: [
      "Core Web Vitals Metric Restoration",
      "Bloated Codebase & Style Refactoring",
      "Fluid Micro-Animations & SEO Integrity",
    ],
    cta: "Boost My Performance",
    featured: false,
  },
];

const GUARANTEES = [
  { icon: Clock, label: "On-time or I keep working free" },
  { icon: Shield, label: "Clean handover — you own everything" },
  { icon: InfinityIcon, label: "Post-delivery support included" },
];

/* ------------------------------- Services ----------------------------------- */

export default function Services() {
  const spotlight = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden border-b border-zinc-900 bg-[#05070a] py-20 px-6 md:px-12 md:py-28 font-sans"
    >
      {/* Top hairline */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00d9ff]/40 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-[#00d9ff]/[0.05] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ── Heading ── */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-cyan-500">
              // Core Capabilities
            </span>
            <h2 className="font-display text-3xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
              Engineering Services{" "}
              <span className="text-outline-strong">Offered.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-zinc-500">
            Delivering scalable interface engineering, performant codebase
            modernization, and seamless design-to-code implementations crafted
            to hit your specific operational goals.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PACKAGES.map((pack) => {
            const Icon = pack.icon;
            return (
              <div
                key={pack.id}
                onMouseMove={spotlight}
                className={`group relative flex flex-col rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-2 ${
                  pack.featured
                    ? "border-[#00d9ff]/40 bg-gradient-to-b from-[#0a1620] to-[#05070a] shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,217,255,0.07)]"
                    : "border-zinc-800 bg-[#080b0f] hover:border-[#00d9ff]/40 hover:shadow-[0_0_30px_rgba(0,217,255,0.06)]"
                }`}
              >
                {/* Cursor spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(0,217,255,0.06), transparent 65%)",
                  }}
                />

                {/* ✨ Featured badge */}
                {pack.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="mono flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#00d9ff] px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_24px_rgba(0,217,255,0.5)]">
                      <Zap className="h-3 w-3" />
                      Most Deployed
                    </span>
                  </div>
                )}

                <div className="relative flex flex-1 flex-col">
                  {/* Tag */}
                  <span className="mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                    {pack.tag}
                  </span>

                  {/* ✨ Icon */}
                  <div className="mt-4 mb-1 flex h-11 w-11 items-center justify-center rounded-xl border border-[#00d9ff]/25 bg-[#00d9ff]/[0.06] text-cyan-300 transition-all duration-300 group-hover:border-[#00d9ff]/60 group-hover:shadow-[0_0_18px_rgba(0,217,255,0.25)]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white">
                    {pack.title}
                  </h3>

                  {/* ✨ Tagline */}
                  <p className="mono mt-1.5 text-[11px] uppercase tracking-wider text-cyan-500/80">
                    {pack.tagline}
                  </p>

                  {/* Price + timeline */}
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-extrabold text-white">
                      {pack.price}
                    </span>
                    <span className="mono text-xs uppercase text-zinc-600">/ build</span>
                  </div>
                  <span className="mono mt-3 inline-flex w-fit items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-[10px] uppercase tracking-wider text-zinc-400">
                    <Clock className="h-3 w-3" />
                    {pack.timeline}
                  </span>

                  {/* Description */}
                  <p className="pt-4 text-sm leading-relaxed text-zinc-400">{pack.desc}</p>

                  {/* Features */}
                  <ul className="mt-6 space-y-3 border-t border-zinc-900 pt-6">
                    {pack.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-zinc-300 md:text-sm">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-500" strokeWidth={2.5} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="relative pt-8">
                  <a
                    href="#contact"
                    className="group/cta flex w-full items-center justify-center gap-2 rounded-xl border border-[#00d9ff]/30 bg-[#00d9ff]/[0.06] py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-cyan-200 transition-all duration-300 hover:border-[#00d9ff] hover:bg-[#00d9ff] hover:text-black hover:shadow-[0_0_35px_rgba(0,217,255,0.4)]"
                  >
                    {pack.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Guarantees strip ── */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-[#00d9ff]/12 bg-white/[0.02] px-8 py-6">
          {GUARANTEES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="h-4 w-4 text-cyan-500" strokeWidth={1.5} />
              <span className="mono text-[11px] uppercase tracking-wider text-zinc-400">
                {label}
              </span>
            </div>
          ))}
          <a
            href="#contact"
            className="mono group flex items-center gap-2 text-[11px] uppercase tracking-wider text-white"
          >
            Have a custom scope?
            <span className="border-b border-[#00d9ff]/50 pb-0.5 text-cyan-300 transition-colors group-hover:border-cyan-300">
              Let's negotiate
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
}