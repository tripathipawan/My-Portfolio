"use client";
import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiMenu, FiX, FiDownload } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { Resume } from "../../data/index";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

function useActiveSection(): string {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 50) {
        setActive("home");
        return;
      }
      let current = "home";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - 64 <= 0) {
          current = l.id;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}

function smoothScroll(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.offsetTop - 5, behavior: "smooth" });
}

export default function Navbar({ ready }: { ready: boolean }) {
  const active = useActiveSection();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const marqueeEl = document.getElementById("marquee-bar");
      if (marqueeEl) {
        setScrolled(marqueeEl.getBoundingClientRect().bottom <= 110);
      } else {
        setScrolled(window.scrollY > 200);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBg = scrolled
    ? theme === "dark"
      ? "rgba(6,8,16,0.92)"
      : "rgba(220,226,235,0.92)"
    : "transparent";

  // Hero pe hamesha white, scroll ke baad theme color
  const linkColor = scrolled ? "var(--text2)" : "rgba(255,255,255,0.8)";
  const activeLinkColor = scrolled ? "var(--accent-h)" : "rgba(255,255,255,1)";
  const underlineColor = scrolled ? "var(--accent)" : "rgba(255,255,255,0.9)";
  const iconColor = scrolled ? "var(--text2)" : "rgba(255,255,255,0.85)";

  return (
    <>
      <style>{`
        @keyframes navSlideDown {
          from { transform: translateY(-80px); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes mobileMenuIn {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes nudgeDown {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(3px); }
        }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          height: 64,
          background: navBg,
          backdropFilter: scrolled ? "blur(28px) saturate(2)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(28px) saturate(2)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "background 0.4s ease, border 0.4s ease",
          animation: ready
            ? "navSlideDown 0.65s cubic-bezier(0.34,1.56,0.64,1) 0.1s both"
            : "none",
        }}
      >
        <div className="h-full max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => smoothScroll("home")}
            className="select-none flex-shrink-0 hover:scale-105 transition-transform duration-200"
          >
            <div
              className="text-xl font-black tracking-tight"
              style={{ fontFamily: "var(--font)" }}
            >
              <span className="g-text">Pawan Tripathi</span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <ul className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
            {LINKS.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <button
                    onClick={() => smoothScroll(l.id)}
                    className="relative px-3 py-2 text-[13px] font-medium rounded-lg transition-colors hover:scale-110 duration-200"
                    style={{
                      color: isActive ? activeLinkColor : linkColor,
                      transition: "color 0.3s ease",
                    }}
                  >
                    <span className="relative z-10">{l.label}</span>
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                      style={{
                        background: underlineColor,
                        width: isActive ? "60%" : "0%",
                        transition: "width 0.3s ease, background 0.3s ease",
                      }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 hover:scale-110 transition-all duration-200"
              style={{
                color: iconColor,
                transition:
                  "color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
                background: scrolled
                  ? "linear-gradient(145deg, var(--bg2), var(--bg3))"
                  : "rgba(255,255,255,0.15)",
                boxShadow: scrolled
                  ? "var(--neu-out)"
                  : "0 2px 8px rgba(0,0,0,0.2)",
                backdropFilter: !scrolled ? "blur(8px)" : "none",
              }}
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            {/* Resume — desktop */}
            <a
              href={Resume.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-white flex-shrink-0 hover:scale-[1.04] hover:-translate-y-0.5 transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg,var(--accent),var(--accent-h))",
                boxShadow: "0 4px 16px var(--accent-glow)",
                textDecoration: "none",
              }}
            >
              <FiDownload size={13} />
              Resume
              <span
                style={{
                  display: "inline-block",
                  animation: "nudgeDown 1.5s ease infinite",
                }}
              >
                ↓
              </span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="xl:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-200"
              style={{
                color: iconColor,
                transition:
                  "color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
                background: scrolled
                  ? "linear-gradient(145deg, var(--bg2), var(--bg3))"
                  : "rgba(255,255,255,0.15)",
                boxShadow: scrolled
                  ? "var(--neu-out)"
                  : "0 2px 8px rgba(0,0,0,0.2)",
                backdropFilter: !scrolled ? "blur(8px)" : "none",
              }}
              aria-label="Toggle mobile menu"
            >
              {open ? <FiX size={19} /> : <FiMenu size={19} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[98] xl:hidden"
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
              animation: "backdropIn 0.2s ease forwards",
            }}
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div
            className="fixed top-[70px] left-4 right-4 z-[99] rounded-2xl p-4 xl:hidden"
            style={{
              background: "linear-gradient(145deg,var(--bg2),var(--bg3))",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              border: "1px solid var(--border)",
              animation:
                "mobileMenuIn 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards",
            }}
          >
            <div className="grid grid-cols-2 gap-2 mb-3">
              {LINKS.map((l, i) => {
                const isActive = active === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => {
                      smoothScroll(l.id);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200"
                    style={{
                      color: isActive ? "var(--accent-h)" : "var(--text2)",
                      background: isActive
                        ? "rgba(99,102,241,0.12)"
                        : "rgba(255,255,255,0.02)",
                      border: isActive
                        ? "1px solid rgba(99,102,241,0.25)"
                        : "1px solid var(--border)",
                      animationDelay: `${i * 0.04}s`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: isActive ? "var(--accent)" : "var(--text3)",
                        boxShadow: isActive ? "0 0 8px var(--accent)" : "none",
                      }}
                    />
                    {l.label}
                  </button>
                );
              })}
            </div>

            <div
              className="h-px my-3"
              style={{ background: "var(--border)" }}
            />

            {/* Resume — mobile */}
            <a
              href={Resume.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity duration-200"
              style={{
                background:
                  "linear-gradient(135deg,var(--accent),var(--accent-h))",
                boxShadow: "0 4px 16px var(--accent-glow)",
                textDecoration: "none",
              }}
            >
              <FiDownload size={14} />
              Download Resume
            </a>
          </div>
        </>
      )}
    </>
  );
}
