"use client";
import { useEffect } from "react";
import { skillCategories } from "../../data/index";

interface SkillCategory {
  cat: string;
  icon: string;
  color: string;
  skills: string[];
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sk-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -30px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SkillCard({ cat, index }: { cat: SkillCategory; index: number }) {
  return (
    <div
      className="sk-card relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg2)] p-5 cursor-default transition-all duration-300"
      style={{
        opacity: 0,
        transform: "translateY(32px)",
        transition: `opacity 0.55s ease ${index * 60}ms, transform 0.55s ease ${index * 60}ms`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = cat.color + "55";
        el.style.boxShadow = `0 12px 40px ${cat.color}18, 0 2px 8px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "var(--border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background: `linear-gradient(90deg, ${cat.color} 0%, ${cat.color}00 80%)`,
        }}
      />

      {/* Background glow */}
      <div
        className="pointer-events-none absolute -top-8 -right-5 h-24 w-24 rounded-full blur-xl"
        style={{ background: cat.color + "0c" }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 pt-1">
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg"
          style={{
            background: cat.color + "18",
            border: `1px solid ${cat.color}30`,
          }}
        >
          {cat.icon}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-[var(--text1)]">
            {cat.cat}
          </h3>
          <div className="mt-1.5 flex items-center gap-1">
            <div
              className="h-0.5 w-6 rounded-full"
              style={{ background: cat.color }}
            />
            <div
              className="h-0.5 w-2.5 rounded-full"
              style={{ background: cat.color + "44" }}
            />
          </div>
        </div>

        <span
          className="flex-shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold font-mono tracking-wide"
          style={{
            color: cat.color,
            background: cat.color + "15",
            border: `1px solid ${cat.color}30`,
          }}
        >
          {cat.skills.length}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--border)]" />

      {/* Skill pills */}
      <div className="flex flex-wrap gap-1.5">
        {cat.skills.map((skill) => (
          <span
            key={skill}
            className="cursor-default rounded-lg border border-[var(--border)] bg-[var(--bg3)] px-2.5 py-1 text-[11px] font-semibold text-[var(--text2)] transition-all duration-200 hover:border-current"
            style={{ fontFamily: "var(--font)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = cat.color;
              el.style.borderColor = cat.color + "50";
              el.style.background = cat.color + "10";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--text2)";
              el.style.borderColor = "var(--border)";
              el.style.background = "var(--bg3)";
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  useReveal();
  const totalSkills = skillCategories.reduce(
    (sum, c) => sum + c.skills.length,
    0,
  );

  return (
    <section id="skills" className="relative overflow-hidden bg-[var(--bg1)]">
      {/* Decorative orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-[10%] h-80 w-80 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[80px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-[15%] h-72 w-72 rounded-full bg-[var(--green)] opacity-[0.05] blur-[80px]"
      />

      <div className="section-wrap">
        {/* Section header */}
        <div className="mb-10">
          {/* Badge */}
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--accent-h)]"
            style={{ background: "var(--accent)" + "12" }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
              style={{ animation: "blink 2s ease infinite" }}
            />
            Technical Skills
          </div>

          {/* Heading row — stacks on mobile */}
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div
              className="min-w-0 flex-1"
              style={{ minWidth: "min(100%, 280px)" }}
            >
              <h2 className="mb-3 text-[clamp(1.7rem,4.5vw,3.2rem)] font-black leading-[1.1] tracking-tight text-[var(--text1)]">
                What I <span className="g-text">Work With</span>
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-[var(--text2)]">
                A comprehensive toolkit built through hands-on projects,
                continuous learning, and real-world problem solving.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-shrink-0 items-center gap-5 pt-1">
              <div className="text-center">
                <div className="g-text text-3xl font-black leading-none">
                  {totalSkills}+
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-[var(--text3)]">
                  Skills
                </div>
              </div>
              <div className="h-10 w-px bg-[var(--border)]" />
              <div className="text-center">
                <div className="g-text text-3xl font-black leading-none">
                  {skillCategories.length}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-[var(--text3)]">
                  Categories
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards grid — 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.cat} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
