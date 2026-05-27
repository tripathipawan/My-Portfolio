"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink, FiArrowUpRight } from "react-icons/fi";
import { projects } from "../../data/index";

const NAV = 60;
const CARD_W = 35; // vw per card
const CARD_GAP = 5; // vw gap between cards

export default function Projects() {
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
          {/* HEADER */}
          <div className="flex flex-col items-center pt-6 pb-8 gap-1">
            <span
              className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase"
              style={{ color: "var(--green)" }}
            >
              <span
                className="w-6 h-0.5 rounded-full inline-block"
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

          {/* CARDS STRIP */}
          <motion.div
            style={{
              x,
              display: "flex",
              gap: `${CARD_GAP}vw`,
              position: "absolute",
              top: "auto",
            }}
          >
            {projects.map((p, i) => (
              <Card key={p.id} p={p} i={i} total={projects.length} navH={NAV} />
            ))}

            {/* CTA CARD — same size as project cards */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center rounded-2xl gap-6"
              style={{
                width: `${CARD_W}vw`,
                maxHeight: `calc(100vh - ${NAV + 88 + 24}px)`,
                border: "1px solid var(--border)",
                background: "var(--bg2)",
                boxShadow:
                  "0 0 0 1px var(--border), 0 24px 60px rgba(0,0,0,0.35)",
              }}
            >
              <div className="flex flex-col items-center gap-2 text-center px-8">
                <span
                  className="text-4xl mb-2"
                  style={{ filter: "grayscale(0.2)" }}
                >
                  👾
                </span>
                <h3
                  className="font-black text-[1.3rem] leading-tight"
                  style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
                >
                  Want to see more?
                </h3>
                <p
                  className="text-[0.78rem] leading-relaxed"
                  style={{ color: "var(--text2)" }}
                >
                  These are just the highlights. Check out my GitHub for all
                  projects, experiments, and open-source work.
                </p>
              </div>

              <motion.a
                href="https://github.com/tripathipawan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-[0.85rem] font-bold"
                style={{
                  color: "#fff",
                  background: "var(--green)",
                  textDecoration: "none",
                  fontFamily: "var(--font)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
              >
                <FiGithub size={15} />
                View All on GitHub
                <FiArrowUpRight size={14} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── CARD ── */
function Card({
  p,
  i,
  total,
  navH,
}: {
  p: (typeof projects)[number];
  i: number;
  total: number;
  navH: number;
}) {
  const counter = `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div
      className="flex-shrink-0 flex flex-col rounded-2xl overflow-hidden"
      style={{
        width: `${CARD_W}vw`,
        maxHeight: `calc(100vh - ${navH + 88 + 24}px)`,
        border: "1px solid var(--border)",
        background: "var(--bg2)",
        boxShadow: `0 0 0 1px var(--border), 0 24px 60px rgba(0,0,0,0.35), 0 0 60px ${p.color}0d`,
      }}
    >
      {/* IMAGE BLOCK */}
      <div
        className="relative w-full overflow-hidden flex-shrink-0"
        style={{
          height: "50%",
          background: `linear-gradient(145deg, ${p.color}1a 0%, ${p.color}06 100%)`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[3px] z-10"
          style={{
            background: `linear-gradient(90deg, ${p.color} 0%, ${p.color}00 100%)`,
            boxShadow: `0 1px 12px ${p.color}66`,
          }}
        />
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover object-top block"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {p.emoji}
          </div>
        )}
      </div>

      {/* CONTENT BLOCK */}
      <div
        className="flex flex-col flex-1 min-h-0 p-5 gap-3"
        style={{
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex items-center justify-between flex-shrink-0">
          <span
            className="text-[0.6rem] font-bold tracking-widest uppercase"
            style={{ color: p.color }}
          >
            {counter}
          </span>
          {p.featured && (
            <span
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[0.6rem] font-bold"
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
          <span className="text-xl flex-shrink-0">{p.emoji}</span>
          <h3
            className="font-black text-[1.05rem] leading-tight"
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
              className="px-2.5 py-1 rounded-md text-[0.62rem] font-semibold"
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

        <div className="flex gap-2.5 mt-auto pt-1">
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[0.78rem] font-semibold transition-transform hover:-translate-y-0.5 active:scale-95"
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
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[0.78rem] font-bold transition-transform hover:-translate-y-0.5 active:scale-95"
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
