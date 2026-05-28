"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { projects } from "../../data/index";

const NAV = 30;
const CARD_W = 34;
const CARD_GAP = 3.5;

/* ── detect mobile ── */
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

/* ══════════════════════════════════════
   SHARED HEADER — left-aligned like other sections
══════════════════════════════════════ */
function SectionHeader() {
  return (
    <div className="mb-14">
      <div
        className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-3"
        style={{ color: "var(--green)" }}
      >
        <span
          className="inline-block w-7 h-0.5 rounded-full"
          style={{ background: "var(--green)" }}
        />
        What I Built
      </div>
      <h2
        className="font-black leading-tight tracking-tight text-[clamp(2rem,4.5vw,3.2rem)]"
        style={{ fontFamily: "var(--font)" }}
      >
        My <span className="g-text">Projects</span>
      </h2>
    </div>
  );
}

/* ══════════════════════════════════════
   CARD — shared between desktop & mobile
══════════════════════════════════════ */
function Card({
  p,
  i,
  total,
  cardStyle = {},
  imageStyle = {},
}: {
  p: (typeof projects)[number];
  i: number;
  total: number;
  cardStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
}) {
  const counter = `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div
      className="group flex flex-shrink-0 flex-col overflow-hidden rounded-2xl"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg2)",
        boxShadow: `0 0 0 1px var(--border), 0 8px 32px rgba(0,0,0,0.28)`,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        ...cardStyle,
      }}
    >
      {/* Colored top line */}
      <div
        className="absolute left-0 right-0 top-0 z-10 h-[2.5px] rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, ${p.color}, ${p.color}44)`,
          boxShadow: `0 1px 10px ${p.color}55`,
          position: "relative",
        }}
      />

      {/* Image area */}
      <div
        className="relative w-full flex-shrink-0 overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${p.color}1a 0%, ${p.color}06 100%)`,
          ...imageStyle,
        }}
      >
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="block h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-6xl">
            {p.emoji}
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* Counter + Featured on image */}
        <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between">
          <span
            className="text-[0.58rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md"
            style={{
              color: p.color,
              background: "rgba(0,0,0,0.55)",
              border: `1px solid ${p.color}44`,
              backdropFilter: "blur(4px)",
            }}
          >
            {counter}
          </span>
          {p.featured && (
            <span
              className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.58rem] font-bold"
              style={{
                color: "#fbbf24",
                background: "rgba(0,0,0,0.55)",
                border: "1px solid rgba(251,191,36,0.35)",
                backdropFilter: "blur(4px)",
              }}
            >
              <HiSparkles size={9} /> Featured
            </span>
          )}
        </div>
      </div>

      {/* Card content */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <span className="flex-shrink-0 text-xl">{p.emoji}</span>
          <h3
            className="text-[1rem] font-black leading-tight"
            style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
          >
            {p.title}
          </h3>
        </div>

        {/* Description */}
        <p
          className="text-[0.78rem] leading-relaxed line-clamp-2"
          style={{ color: "var(--text2)" }}
        >
          {p.desc}
        </p>

        <div className="h-px w-full" style={{ background: "var(--border)" }} />

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {p.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-md px-2.5 py-0.5 text-[0.6rem] font-semibold"
              style={{
                color: "var(--text2)",
                background: "var(--bg3)",
                border: "1px solid var(--border)",
              }}
            >
              {t}
            </span>
          ))}
          {p.tech.length > 5 && (
            <span
              className="rounded-md px-2.5 py-0.5 text-[0.6rem] font-semibold"
              style={{
                color: p.color,
                background: `${p.color}15`,
                border: `1px solid ${p.color}33`,
              }}
            >
              +{p.tech.length - 5}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-2 pt-1 mb-1">
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-[0.75rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              color: "var(--text2)",
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            <FiGithub size={12} /> GitHub
          </a>
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-[0.75rem] font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              color: "#fff",
              background: `linear-gradient(135deg, ${p.color} 0%, ${p.color}bb 100%)`,
              boxShadow: `0 4px 16px ${p.color}44`,
              textDecoration: "none",
            }}
          >
            <FiExternalLink size={12} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CTA CARD
══════════════════════════════════════ */
function CtaCard({ cardStyle = {} }: { cardStyle?: React.CSSProperties }) {
  return (
    <div
      className="relative flex flex-shrink-0 flex-col items-center justify-center gap-5 rounded-2xl overflow-hidden"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg2)",
        boxShadow: "0 0 0 1px var(--border), 0 8px 32px rgba(0,0,0,0.28)",
        ...cardStyle,
      }}
    >
      {/* Glow bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(ellipse at 50% 110%, var(--green)20 0%, transparent 65%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-2 px-8 text-center">
        <span className="mb-1 text-4xl">👾</span>
        <h3
          className="text-[1.15rem] font-black leading-tight"
          style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
        >
          Want to see more?
        </h3>
        <p
          className="text-[0.78rem] leading-relaxed"
          style={{ color: "var(--text2)" }}
        >
          These are just the highlights. Check out my GitHub for all projects,
          experiments, and open-source work.
        </p>
      </div>

      <motion.a
        href="https://github.com/tripathipawan"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-2.5 rounded-xl px-6 py-2.5 text-[0.82rem] font-bold"
        style={{
          color: "#fff",
          background: "var(--green)",
          textDecoration: "none",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          fontFamily: "var(--font)",
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 340, damping: 22 }}
      >
        <FiGithub size={14} /> View All on GitHub <FiArrowUpRight size={13} />
      </motion.a>
    </div>
  );
}

/* ══════════════════════════════════════
   DESKTOP — horizontal scroll (sticky)
══════════════════════════════════════ */
function DesktopProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(1440);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const contentLeft = Math.max((vw - 1180) / 2, 24);
  const contentLeftVw = (contentLeft / vw) * 100;

  // Card width in px
  const cardWpx = (CARD_W / 100) * vw;
  const cardGapPx = (CARD_GAP / 100) * vw;

  const endXVw = contentLeftVw - projects.length * (CARD_W + CARD_GAP);

  const scrollHeight = projects.length * 100; // vh units

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`${contentLeftVw}vw`, `${endXVw}vw`]
  );

  return (
    <section id="projects">
      <div ref={containerRef} style={{ height: `${scrollHeight}vh` }}>
        <div
          className="sticky overflow-hidden"
          style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, width: "100vw" }}
        >
          {/* Left-aligned header — matches section-wrap exactly */}
          <div className="max-w-[1180px] mx-auto px-6 pt-8 pb-2">
            <SectionHeader />
          </div>

          {/* Scrolling cards row */}
          <motion.div
            style={{
              x,
              display: "flex",
              gap: `${CARD_GAP}vw`,
              position: "absolute",
              top: 0,
              paddingTop: `${NAV + 110}px`,
              paddingBottom: "24px",
              willChange: "transform",
            }}
          >
            {projects.map((p, i) => (
              <Card
                key={p.id}
                p={p}
                i={i}
                total={projects.length}
                cardStyle={{
                  width: `${CARD_W}vw`,
                  maxHeight: `calc(100vh - ${NAV + 140}px)`,
                }}
                imageStyle={{
                  height: "46%",
                  aspectRatio: "unset",
                  flexShrink: 0,
                }}
              />
            ))}
            <CtaCard
              cardStyle={{
                width: `${CARD_W}vw`,
                maxHeight: `calc(100vh - ${NAV + 140}px)`,
                padding: "2rem",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   MOBILE — vertical grid
══════════════════════════════════════ */
function MobileCard({ p, i, total }: { p: (typeof projects)[number]; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      <Card
        p={p}
        i={i}
        total={total}
        cardStyle={{ height: "auto" }}
        imageStyle={{ aspectRatio: "16/9" }}
      />
    </motion.div>
  );
}

function MobileProjects() {
  return (
    <section id="projects" className="bg-[var(--bg1)]">
      <div className="section-wrap">
        <SectionHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <MobileCard key={p.id} p={p} i={i} total={projects.length} />
          ))}
          <div className="sm:col-span-2">
            <CtaCard cardStyle={{ minHeight: "220px", padding: "2.5rem" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   EXPORT — desktop vs mobile
══════════════════════════════════════ */
export default function Projects() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileProjects /> : <DesktopProjects />;
}