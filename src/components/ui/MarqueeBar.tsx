"use client";
import type { ElementType } from "react";
import { FaReact, FaGitAlt, FaFire, FaCss3Alt, FaHtml5 } from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiVite,
  SiRedux,
  SiMongodb,
  SiGithub,
  SiJavascript,
} from "react-icons/si";

const SKILLS = [
  { label: "REACT.JS", Icon: FaReact },
  { label: "TYPESCRIPT", Icon: SiTypescript },
  { label: "TAILWIND CSS", Icon: SiTailwindcss },
  { label: "GSAP", Icon: FaFire },
  { label: "FRAMER MOTION", Icon: SiFramer },
  { label: "VITE", Icon: SiVite },
  { label: "REDUX", Icon: SiRedux },
  { label: "MONGODB", Icon: SiMongodb },
  { label: "GITHUB", Icon: SiGithub },
  { label: "FIREBASE", Icon: FaFire },
  { label: "JAVASCRIPT", Icon: SiJavascript },
  { label: "CSS3", Icon: FaCss3Alt },
  { label: "HTML5", Icon: FaHtml5 },
  { label: "GIT", Icon: FaGitAlt },
];

function Dot() {
  return (
    <span
      className="flex-shrink-0 w-1 h-1 rounded-full mx-1"
      style={{ background: "var(--accent)", opacity: 0.4 }}
    />
  );
}

function Item({ label, Icon }: { label: string; Icon: ElementType }) {
  return (
    <div className="flex items-center gap-2.5 px-5 flex-shrink-0">
      <span style={{ color: "var(--green)" }}>
        <Icon size={13} />
      </span>
      <span
        className="text-[11px] font-bold tracking-[0.18em] whitespace-nowrap"
        style={{ color: "var(--text3)" }}
      >
        {label}
      </span>
      <Dot />
    </div>
  );
}

export default function MarqueeBar() {
  /* Duplicate twice → track is 2× width → translateX(-50%) = seamless loop */
  const doubled = [...SKILLS, ...SKILLS];

  return (
    <div
      className="marquee-wrap w-full py-3 border-y"
      style={{
        borderColor: "var(--border)",
        background:
          "linear-gradient(90deg, var(--bg0) 0%, var(--bg2) 50%, var(--bg0) 100%)",
        overflow: "hidden",
      }}
    >
      <div className="marquee-track">
        {doubled.map((s, i) => (
          <Item key={i} label={s.label} Icon={s.Icon} />
        ))}
      </div>
    </div>
  );
}

