import { useEffect, useRef, useState } from "react";

const REVIEWS = [
  {
    name: "Ayesha K.",
    role: "Client — E-commerce Store",
    text: "Mahak delivered a lightning-fast store with pixel-perfect design. Product pages, cart, and checkout all feel smooth. My sales clearly improved after the launch.",
  },
  {
    name: "Bilal A.",
    role: "Director — Coaching Institute",
    text: "Our institute website looks professional and loads instantly. Course details, admissions, and contact sections are exactly how we wanted. Parents keep praising it.",
  },
  {
    name: "Sana M.",
    role: "Owner — Food Business",
    text: "She understood our brand instantly. The WhatsApp ordering flow she built doubled our daily orders. Truly impressive work.",
  },
  {
    name: "Usman T.",
    role: "Founder — SaaS Startup",
    text: "Mahak built our complete SaaS dashboard with clean charts, user management, and a modern UI. The code quality is excellent and everything works flawlessly.",
  },
  {
    name: "Fatima N.",
    role: "Client — Medical App",
    text: "Our medical appointment app turned out better than expected. Booking doctors, reminders, and the whole flow feels simple for patients of every age.",
  },
  {
    name: "Ahmed D.",
    role: "Marketing Lead — SaaS Product",
    text: "The landing page she designed converted visitors from day one. Fast, responsive, and the animations give it a premium feel. Great experience overall.",
  },
  {
    name: "Zainab S.",
    role: "Owner — Restaurant",
    text: "From menu design to the ordering section, everything was smooth. The site looks premium and loads instantly. Best developer experience I've had.",
  },
  {
    name: "Hamza R.",
    role: "Client — Business Website",
    text: "From design to deployment, everything was handled professionally. Communication was clear and the site was delivered before the deadline. Highly recommended!",
  },
  {
    name: "Hira Q.",
    role: "Founder — Online Academy",
    text: "Mahak built our e-learning platform with course pages and a student-friendly layout. Enrollments increased because the website finally looks trustworthy.",
  },
  {
    name: "Danish M.",
    role: "Client — Fashion Store",
    text: "My clothing store looks stunning on mobile and desktop. Product images, filters, and the checkout flow — everything is polished. Worth every rupee.",
  },
];

function Reviews() {
  const [active, setActive] = useState(0);

  /* Auto-rotate every 5s */
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);

  /* Reveal on scroll */
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="reviews" className="relative overflow-hidden py-28">
      {/* bg glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00d9ff]/[0.05] blur-[130px]" />

      <div ref={ref} className={`mx-auto max-w-3xl px-6 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* heading */}
        <p className="mono text-[11px] uppercase tracking-[0.3em] text-[#00d9ff]">
          [ 04 — Reviews ]
        </p>
        <h2 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
          What clients <span className="text-[#00d9ff]">say</span>
        </h2>
        <p className="mt-3 text-sm text-zinc-500">
          Real feedback from real projects.
        </p>

        {/* slider */}
        <div className="mt-12 grid">
          {REVIEWS.map((r, i) => (
            <div
              key={r.name}
              className={`relative rounded-2xl border p-8 transition-all duration-500 md:p-10 ${
                i === active
                  ? "col-start-1 row-start-1 border-[#00d9ff]/30 bg-[#0c1218]/80 opacity-100"
                  : "col-start-1 row-start-1 pointer-events-none opacity-0"
              }`}
              style={{
                boxShadow: i === active ? "0 0 40px rgba(0,217,255,0.08), inset 0 0 30px rgba(0,217,255,0.03)" : "none",
              }}
            >
              {/* stars */}
              <div className="text-sm tracking-[0.3em] text-[#00d9ff]">★★★★★</div>

              {/* quote */}
              <p className="mt-6 font-display text-xl leading-relaxed text-zinc-200 md:text-2xl">
                "{r.text}"
              </p>

              {/* who */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#00d9ff]/40 bg-[#05070a] font-display text-sm font-bold text-[#00d9ff]">
                  {r.name[0]}
                </span>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-zinc-500">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* dots */}
        <div className="mt-8 flex justify-center gap-2.5">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Review ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-[#00d9ff] shadow-[0_0_10px_rgba(0,217,255,0.7)]" : "w-2 bg-zinc-700 hover:bg-zinc-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;