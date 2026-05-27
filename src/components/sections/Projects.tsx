// "use client";
// import { useEffect } from "react";
// import { FiGithub, FiExternalLink } from "react-icons/fi";
// import { projects } from "../../data/index";

// function useReveal() {
//   useEffect(() => {
//     const run = () => {
//       const els = document.querySelectorAll(".pj-card:not(.in)");
//       const io = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((e) => {
//             if (e.isIntersecting) {
//               e.target.classList.add("in");
//               io.unobserve(e.target);
//             }
//           });
//         },
//         { threshold: 0.06, rootMargin: "0px 0px -20px 0px" },
//       );
//       els.forEach((el) => io.observe(el));
//       return io;
//     };
//     const io = run();
//     return () => io.disconnect();
//   });
// }

// export default function Projects() {
//   useReveal();

//   return (
//     <section
//       id="projects"
//       style={{ background: "var(--bg1)", overflow: "hidden" }}
//     >
//       <style>{`
//         .pj-card { opacity:0; transform:translate3d(0,20px,0); transition:opacity 0.5s ease var(--pj-d,0ms),transform 0.5s ease var(--pj-d,0ms); will-change:opacity,transform; }
//         .pj-card.in { opacity:1; transform:translate3d(0,0,0); will-change:auto; }
//         .pj-card.in:hover { transform:translate3d(0,-6px,0); }
//         .pj-btn { transition:transform 0.15s ease,opacity 0.15s ease; }
//         .pj-btn:hover { opacity:0.82; transform:translate3d(0,-1px,0); }
//         .pj-btn:active { transform:scale(0.97); }
//       `}</style>

//       <div className="section-wrap">
//         <div className="mb-14">
//           <div
//             className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase mb-3"
//             style={{ color: "var(--green)" }}
//           >
//             <span
//               className="inline-block w-7 h-0.5 rounded-full"
//               style={{ background: "var(--green)" }}
//             />
//             What I built
//           </div>
//           <h2
//             className="text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight"
//             style={{ color: "var(--text1)", fontFamily: "var(--font)" }}
//           >
//             My <span className="g-text">Projects</span>
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {projects.map((p, i) => (
//             <div
//               key={p.id}
//               className="pj-card flex flex-col rounded-[1.1rem] overflow-hidden"
//               style={
//                 {
//                   background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
//                   boxShadow: "var(--neu-out)",
//                   border: "1px solid var(--border)",
//                   "--pj-d": `${i * 50}ms`,
//                 } as React.CSSProperties
//               }
//             >
//               <div
//                 className="h-[3px] w-full flex-shrink-0"
//                 style={{
//                   background: `linear-gradient(90deg,${p.color},${p.color}55)`,
//                   boxShadow: `0 0 12px ${p.color}44`,
//                 }}
//               />
//               <div className="p-5 flex flex-col flex-1">
//                 <div className="flex items-start justify-between gap-2 mb-3">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <div
//                       className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
//                       style={{
//                         background:
//                           "linear-gradient(145deg,var(--bg3),var(--bg2))",
//                         boxShadow: "var(--neu-in-sm)",
//                       }}
//                     >
//                       {p.emoji}
//                     </div>
//                     <div className="min-w-0">
//                       <h3
//                         className="font-extrabold text-[1rem] leading-tight truncate"
//                         style={{
//                           color: "var(--text1)",
//                           fontFamily: "var(--font)",
//                         }}
//                       >
//                         {p.title}
//                       </h3>
//                     </div>
//                   </div>
//                   {p.featured && (
//                     <span
//                       className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.63rem] font-bold"
//                       style={{
//                         color: "#fbbf24",
//                         background: "rgba(251,191,36,0.1)",
//                         border: "1px solid rgba(251,191,36,0.25)",
//                       }}
//                     >
//                       ⭐ Featured
//                     </span>
//                   )}
//                 </div>
//                 <p
//                   className="text-[0.82rem] leading-[1.7] mb-4 flex-1"
//                   style={{ color: "var(--text2)" }}
//                 >
//                   {p.desc}
//                 </p>
//                 <div className="flex flex-wrap gap-1.5 mb-5">
//                   {p.tech.map((t) => (
//                     <span
//                       key={t}
//                       className="px-2.5 py-1 rounded-lg text-[0.68rem] font-semibold"
//                       style={{
//                         color: "var(--text2)",
//                         background:
//                           "linear-gradient(145deg,var(--bg3),var(--bg2))",
//                         boxShadow: "var(--neu-in-sm)",
//                         border: "1px solid var(--border)",
//                       }}
//                     >
//                       {t}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex gap-3 mt-auto">
//                   <a
//                     href={p.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="pj-btn flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold"
//                     style={{
//                       color: "var(--text2)",
//                       background:
//                         "linear-gradient(145deg,var(--bg2),var(--bg3))",
//                       boxShadow: "var(--neu-out-sm)",
//                       border: "1px solid var(--border)",
//                     }}
//                   >
//                     <FiGithub size={13} /> GitHub
//                   </a>
//                   <a
//                     href={p.live}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="pj-btn flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white"
//                     style={{
//                       background: `linear-gradient(135deg,${p.color},${p.color}88)`,
//                       boxShadow: `0 4px 16px ${p.color}44`,
//                     }}
//                   >
//                     <FiExternalLink size={13} /> Live
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* View All Projects */}
//         <div className="flex justify-center mt-12">
//           <a
//             href="https://github.com/tripathipawan"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="pj-btn inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold"
//             style={{
//               color: "var(--text2)",
//               background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
//               boxShadow: "var(--neu-out)",
//               border: "1px solid var(--border)",
//             }}
//           >
//             <FiGithub size={15} />
//             View All Projects
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../../data/index";

const NAV = 64;

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(projects.length - 1) * 100}vw`],
  );

  return (
    <section id="projects">
      <div ref={containerRef} style={{ height: `${projects.length * 100}vh` }}>
        <div
          className="sticky overflow-hidden"
          style={{ top: NAV, height: `calc(100vh - ${NAV}px)`, width: "100vw" }}
        >
          {/* ── HEADER ── */}
          <div className="flex flex-col items-center pt-6 pb-4 gap-1">
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

          {/* ── CARDS STRIP ── */}
          <motion.div
            style={{ x, display: "flex", width: `${projects.length * 100}vw` }}
          >
            {projects.map((p, i) => (
              <Card key={p.id} p={p} i={i} total={projects.length} navH={NAV} />
            ))}
          </motion.div>

          {/* ── DOTS ── */}
          <div className="flex justify-center gap-2 pt-3">
            {projects.map((_, i) => (
              <Dot
                key={i}
                progress={scrollYProgress}
                start={i / projects.length}
                end={(i + 1) / projects.length}
              />
            ))}
          </div>

          {/* scroll hint */}
          <div
            className="absolute bottom-3 right-6 hidden md:flex items-center gap-1.5 text-xs"
            style={{ color: "var(--text3)" }}
          >
            Scroll to explore
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.3 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CARD ──────────────────────────────────────────────────── */
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
  // available height = viewport - navbar - header(~88px) - dots(~40px) - padding(~16px)
  const cardH = `calc(100vh - ${navH + 88 + 40 + 16}px)`;

  return (
    <div
      style={{
        width: "100vw",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 clamp(1rem, 5vw, 4rem)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        style={{
          width: "100%",
          maxWidth: 880,
          height: cardH,
          maxHeight: 480,
          display: "flex",
          flexDirection: "row",
          borderRadius: 18,
          overflow: "hidden",
          background: "linear-gradient(145deg, var(--bg2), var(--bg3))",
          boxShadow: `var(--neu-out), 0 0 48px ${p.color}12`,
          border: "1px solid var(--border)",
        }}
      >
        {/* IMAGE — 44% */}
        <div
          style={{
            width: "44%",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(135deg,${p.color}18,${p.color}05)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {p.image ? (
            <img
              src={p.image}
              alt={p.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
              }}
            />
          ) : (
            <div style={{ fontSize: "4rem" }}>{p.emoji}</div>
          )}
          {/* color bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: 3,
              background: `linear-gradient(180deg,${p.color},${p.color}33)`,
              boxShadow: `4px 0 18px ${p.color}44`,
            }}
          />
        </div>

        {/* CONTENT — 56% */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "clamp(1.2rem,3vw,2rem)",
            gap: 12,
            overflowY: "auto",
          }}
        >
          {/* top: counter + badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: p.color,
              }}
            >
              {String(i + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            {p.featured && (
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: 999,
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  color: "#fbbf24",
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.25)",
                }}
              >
                ⭐ Featured
              </span>
            )}
          </div>

          {/* middle: emoji + title + desc */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)" }}>
                {p.emoji}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontWeight: 900,
                  fontSize: "clamp(1rem,2vw,1.4rem)",
                  color: "var(--text1)",
                  fontFamily: "var(--font)",
                  lineHeight: 1.2,
                }}
              >
                {p.title}
              </h3>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(0.76rem,1.1vw,0.86rem)",
                color: "var(--text2)",
                lineHeight: 1.65,
              }}
            >
              {p.desc}
            </p>

            {/* tech tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 4,
              }}
            >
              {p.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "3px 9px",
                    borderRadius: 8,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: "var(--text2)",
                    background: "linear-gradient(145deg,var(--bg3),var(--bg2))",
                    boxShadow: "var(--neu-in-sm)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* bottom: buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "9px 0",
                borderRadius: 10,
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--text2)",
                background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
                boxShadow: "var(--neu-out)",
                border: "1px solid var(--border)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              <FiGithub size={13} /> GitHub
            </a>
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "9px 0",
                borderRadius: 10,
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#fff",
                background: `linear-gradient(135deg,${p.color},${p.color}99)`,
                boxShadow: `0 4px 18px ${p.color}44`,
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              <FiExternalLink size={13} /> Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── DOT ───────────────────────────────────────────────────── */
function Dot({
  progress,
  start,
  end,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const mid = (start + end) / 2;
  const opacity = useTransform(progress, [start, mid, end], [0.3, 1, 0.3]);
  const scale = useTransform(progress, [start, mid, end], [0.7, 1.5, 0.7]);
  return (
    <motion.span
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "var(--green)",
        display: "inline-block",
        opacity,
        scale,
      }}
    />
  );
}
