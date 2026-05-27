"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { personal, phrases } from "@/data/index";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = React.useState("");
  const [wordIdx, setWordIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = words[wordIdx % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setDisplay(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setWordIdx((w) => w + 1);
            setCharIdx(0);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  const typed = useTypewriter(phrases);

  // Section 1: 0% → 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  // Section 2: 20% → 50%
  const opacity2 = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.4, 0.5],
    [0, 1, 1, 0],
  );
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [80, -80]);

  // Section 3: 50% → 80%
  const opacity3 = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7, 0.8],
    [0, 1, 1, 0],
  );
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [80, -80]);

  return (
    <>
      <style>{`
        @keyframes scroll-cue {
          0%, 100% { transform: translateY(0) translateX(-50%); opacity: 0.4; }
          50%       { transform: translateY(7px) translateX(-50%); opacity: 1; }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes pulse-dot {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none z-10">
        {/* ── SECTION 1 — Name + typewriter ── */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-6 md:pb-10"
        >
          <div
            className="rounded-2xl px-5 py-4 md:px-8 md:py-3 w-full max-w-sm md:max-w-lg"
            style={{
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Location pill */}
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="text-white text-xs">📍</span>
              <span className="text-white text-xs font-mono tracking-wider">
                {personal.location}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-none mb-3">
              {personal.name}
            </h1>

            {/* Typewriter */}
            <div className="h-7 flex items-center justify-center">
              <span
                className="text-base md:text-lg font-mono font-medium"
                style={{
                  background: "linear-gradient(90deg,#818cf8,#34d399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {typed}
              </span>
              <span
                className="ml-0.5 text-base md:text-lg text-white/60"
                style={{ animation: "cursor-blink 1s ease infinite" }}
              >
                |
              </span>
            </div>
          </div>

          {/* Scroll cue */}
          <div
            className="absolute bottom-5 left-1/2"
            style={{ animation: "scroll-cue 2s ease infinite" }}
          >
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-white/50" />
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 2 — "I build digital experiences" ── */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col justify-end items-start px-6 md:px-16 pb-20 md:pb-32"
        >
          {/* Status badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                style={{ animation: "pulse-dot 1.4s ease-out infinite" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span
              className="text-xs font-mono tracking-widest text-emerald-300/80 px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(52,211,153,0.08)",
                border: "1px solid rgba(52,211,153,0.2)",
              }}
            >
              {personal.status}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.05] md:max-w-[48%]"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.9)" }}
          >
            <span className="block text-white/60 text-xl sm:text-2xl md:text-3xl font-light mb-1">
              I build digital
            </span>
            <span
              style={{
                background: "linear-gradient(135deg,#60a5fa,#34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              experiences.
            </span>
          </h2>
        </motion.div>

        {/* ── SECTION 3 — "Bridging design & engineering" ── */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col justify-end items-end px-6 md:px-16 text-right"
        >
          <h2
            className="text-3xl sm:text-3xl md:text-5xl font-bold leading-[1.05] md:max-w-[50%]"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.9)" }}
          >
            <span className="block text-white/60 text-xl sm:text-2xl md:text-2xl font-light mb-1">
              Bridging
            </span>
            <span
              style={{
                background: "linear-gradient(135deg,#c084fc,#f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              design
            </span>
            <span className="text-white"> &amp; engineering.</span>
          </h2>

          {/* Subtle bio line — only on md+ */}
          <p
            className="hidden md:block mt-4 text-sm text-white/70 font-mono max-w-[42%] leading-relaxed"
            style={{ textShadow: "none" }}
          >
            {personal.bio}
          </p>
        </motion.div>
      </div>
    </>
  );
}
