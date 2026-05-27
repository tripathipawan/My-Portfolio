"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { projects } from "../../data/index";

const NAV = 30;
const CARD_W = 40;
const CARD_GAP = 4;

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
   SHARED HEADER
══════════════════════════════════════ */
function SectionHeader() {
  return (
    <div className="flex flex-col items-center gap-1 pt-6 pb-6">
      <span
        className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase"
        style={{ color: "var(--green)" }}
      >
        <span
          className="inline-block h-0.5 w-6 rounded-full"
          style={{ background: "var(--green)" }}
        />
        What I Built
      </span>
      <h2
        className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-black leading-tight text-center"
        style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
      >
        My <span className="g-text">Projects</span>
      </h2>
    </div>
  );
}

/* ══════════════════════════════════════
   CARD (shared between both layouts)
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
      className="flex flex-shrink-0 flex-col overflow-hidden rounded-2xl"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg2)",
        boxShadow: `0 0 0 1px var(--border), 0 24px 60px rgba(0,0,0,0.35), 0 0 60px ${p.color}0d`,
        ...cardStyle,
      }}
    >
      {/* Image */}
      <div
        className="relative w-full flex-shrink-0 overflow-hidden"
        style={{
          aspectRatio: "16/9",
          background: `linear-gradient(145deg, ${p.color}1a 0%, ${p.color}06 100%)`,
          ...imageStyle,
        }}
      >
        <div
          className="absolute left-0 right-0 top-0 z-10 h-[3px]"
          style={{
            background: `linear-gradient(90deg, ${p.color} 0%, ${p.color}00 100%)`,
            boxShadow: `0 1px 12px ${p.color}66`,
          }}
        />
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="block h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-6xl">
            {p.emoji}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="flex min-h-0 flex-1 flex-col gap-3 p-2.5"
        style={{ overflowY: "auto", scrollbarWidth: "none" }}
      >
        <div className="flex flex-shrink-0 items-center justify-between">
          <span
            className="text-[0.6rem] font-bold uppercase tracking-widest"
            style={{ color: p.color }}
          >
            {counter}
          </span>
          {p.featured && (
            <span
              className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-[0.6rem] font-bold"
              style={{
                color: "#fbbf24",
                background: "rgba(251,191,36,0.1)",
                border: "1px solid rgba(251,191,36,0.25)",
              }}
            >
              ✦ Featured
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <span className="flex-shrink-0 text-xl">{p.emoji}</span>
          <h3
            className="text-[1.05rem] font-black leading-tight"
            style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
          >
            {p.title}
          </h3>
        </div>

        <p
          className="text-[0.78rem] leading-relaxed"
          style={{ color: "var(--text2)" }}
        >
          {p.desc}
        </p>

        <div className="h-px w-full" style={{ background: "var(--border)" }} />

        <div className="flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-md px-2.5 py-0.5 text-[0.62rem] font-semibold"
              style={{
                color: "var(--text2)",
                background: "var(--bg3)",
                border: "1px solid var(--border)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-1 mb-2">
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-[0.78rem] font-semibold transition-transform hover:-translate-y-0.5 active:scale-95"
            style={{
              color: "var(--text2)",
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            <FiGithub size={13} /> GitHub
          </a>
          <a
            href={p.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-[0.78rem] font-bold transition-transform hover:-translate-y-0.5 active:scale-95"
            style={{
              color: "#fff",
              background: `linear-gradient(135deg, ${p.color} 0%, ${p.color}bb 100%)`,
              boxShadow: `0 4px 18px ${p.color}44`,
              textDecoration: "none",
            }}
          >
            <FiExternalLink size={13} /> Live Demo
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
      className="flex flex-shrink-0 flex-col items-center justify-center gap-6 rounded-2xl"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg2)",
        boxShadow: "0 0 0 1px var(--border), 0 24px 60px rgba(0,0,0,0.35)",
        ...cardStyle,
      }}
    >
      <div className="flex flex-col items-center gap-2 px-8 text-center">
        <span className="mb-2 text-4xl">👾</span>
        <h3
          className="text-[1.3rem] font-black leading-tight"
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
        className="flex items-center gap-2.5 rounded-xl px-6 py-3 text-[0.85rem] font-bold"
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
        <FiGithub size={15} /> View All on GitHub <FiArrowUpRight size={14} />
      </motion.a>
    </div>
  );
}

/* ══════════════════════════════════════
   DESKTOP — horizontal scroll (original)
══════════════════════════════════════ */
function DesktopProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const startX = 30 - CARD_W / 2;
  const totalShift = projects.length * (CARD_W + CARD_GAP);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`${startX}vw`, `${startX - totalShift}vw`],
  );

  return (
    <section id="projects">
      <div ref={containerRef} style={{ height: `${projects.length * 100}vh` }}>
        <div
          className="sticky overflow-hidden"
          style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, width: "100vw" }}
        >
          <SectionHeader />
          <motion.div
            style={{
              x,
              display: "flex",
              gap: `${CARD_GAP}vw`,
              position: "absolute",
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
                  maxHeight: `calc(100vh - ${NAV + 88 + 24}px)`,
                }}
                imageStyle={{ height: "48%", aspectRatio: "unset" }}
              />
            ))}
            <CtaCard
              cardStyle={{
                width: `${CARD_W}vw`,
                maxHeight: `calc(100vh - ${NAV + 88 + 24}px)`,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   MOBILE — vertical stack
══════════════════════════════════════ */
function MobileProjects() {
  return (
    <section id="projects" className="bg-[var(--bg1)]">
      <div className="mx-auto max-w-lg px-4 py-16">
        <SectionHeader />
        <div className="flex flex-col gap-5">
          {projects.map((p, i) => (
            <Card
              key={p.id}
              p={p}
              i={i}
              total={projects.length}
              cardStyle={{ height: "auto" }}
            />
          ))}
          <CtaCard cardStyle={{ minHeight: "220px", padding: "2rem" }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   EXPORT — switch by screen size
══════════════════════════════════════ */
export default function Projects() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileProjects /> : <DesktopProjects />;
}
