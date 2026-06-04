# 🌐 My Portfolio — Pawan Tripathi

A performance-focused, fully responsive personal portfolio built with **Next.js 16**, **React 19**, **TypeScript**, **Framer Motion**, and **Tailwind CSS v4** — featuring a scroll-driven video frame sequence hero (108 WebP frames synced to scroll via `useScroll` + `useTransform`), a custom Framer Motion `Overlay` with 3 scroll-reactive text panels, a hand-built `useTyped` typewriter hook, an `IntersectionObserver`-based scroll reveal system across 5 sections, a 3D perspective mouse-reactive profile card with radial spotlight, a circular SVG scroll progress button, EmailJS contact form with auto-save draft persistence, dark/light theme with `localStorage` sync, and a complete neumorphic CSS design system. Deployed on Vercel.

**🔗 Live Demo:** [pawan8705.vercel.app](https://pawan8705.vercel.app/)

---

## 📌 Overview

This portfolio presents Pawan Tripathi — a Frontend Developer from Uttarakhand, India — through a deliberate content architecture: a cinematic scroll-sequence opening that hooks the visitor, followed by an About section with a 3D profile card, a Skills grid with per-category hover color accents, a Framer Motion horizontal project carousel, and a timeline-based Experience/Education layout with inline Certifications.

The entire visual system is driven by CSS custom properties — `--bg0` through `--bg3`, `--text1` through `--text3`, `--accent`, `--accent-h`, `--accent-glow`, `--green`, `--border`, `--neu-out`, `--neu-in-sm` — defined separately for `[data-theme='dark']` and `[data-theme='light']` in `globals.css`. Switching themes is a single `data-theme` attribute update on `<html>`.

---

## ✨ Features

### 🎬 Scroll-Driven Video Frame Sequence — `ScrollyCanvas.tsx`
- **108-Frame WebP Scroll Sequence** — `FRAME_COUNT = 108` WebP images (`/sequence/frame_000_delay-0.055s.webp` → `frame_107_...`) are preloaded into an `HTMLImageElement[]` array via a `useEffect` loop. A `loadedCount` counter tracks progress and sets `isLoaded = true` only after all 108 images have loaded.
- **Framer Motion `useScroll` + `useTransform`** — `useScroll({ target: containerRef, offset: ['start start', 'end end'] })` returns a `scrollYProgress` MotionValue (0→1). `useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1])` maps it to a frame index. The `frameIndex` MotionValue drives canvas rendering via `.on('change', renderFrame)` — zero React state updates during scroll.
- **`object-fit: cover` Canvas Renderer** — `renderFrame` calculates `scale = Math.max(canvas.width / img.width, canvas.height / img.height)` and centers the image — identical to CSS `object-fit: cover` — so frames fill the sticky canvas at any viewport size.
- **`500vh` Sticky Container** — The outer `<div>` is `h-[500vh]` with the canvas and overlay in a `sticky top-0 h-screen` inner wrapper, giving 5 full viewports of scroll-driven playback.
- **Loading Overlay** — A `"Loading experience..."` text overlay with `animate-pulse` shows while `isLoaded` is false, preventing a blank canvas flash.
- **Resize Handler** — `window.addEventListener('resize', handleResize)` resets `canvas.width/height` and re-renders the current frame on window resize.

### 📝 Scroll-Reactive Text Overlay — `Overlay.tsx`
- **3 Framer Motion Text Panels** — The `Overlay` component receives `scrollYProgress` as a Framer Motion `MotionValue` prop and creates 3 independent panel animations using `useTransform`:
  - **Panel 1** (0%–20%): Name + typewriter + scroll cue — `opacity: [1, 1, 0]` at `[0, 0.1, 0.2]`, `y: [0, -80]`
  - **Panel 2** (20%–50%): "I build digital experiences." — `opacity: [0, 1, 1, 0]` at `[0.2, 0.3, 0.4, 0.5]`, `y: [80, -80]`
  - **Panel 3** (50%–80%): "Bridging design & engineering." — `opacity: [0, 1, 1, 0]` at `[0.5, 0.6, 0.7, 0.8]`, `y: [80, -80]`
- **Inline `useTypewriter` Hook** — A self-contained typewriter function inside `Overlay.tsx` manages `display`, `wordIdx`, `charIdx`, and `deleting` state via `setTimeout` in `useEffect`. Delete speed is `speed / 2` for faster backspace. Cycles through 7 phrases from `data/index.ts`.
- **Blurred Glassmorphism Name Card** — Panel 1 renders a `backdrop-filter: blur(18px)` card with `rgba(0,0,0,0.3)` background and `1px solid rgba(255,255,255,0.1)` border — sitting at the bottom-center of the hero canvas.
- **Availability Pulse Dot** — Panel 2 shows an availability badge with a `pulse-dot` keyframe animation on the emerald status dot.
- **Bouncing Scroll Indicator** — Panel 1 renders a mouse-icon with an inner dot using a `scroll-cue` keyframe (`translateY(0) → translateY(7px) → translateY(0)` with opacity 0.4 → 1).
- **`cursor-blink` Keyframe** — The typewriter cursor `|` blinks with a CSS `cursor-blink: 1s ease infinite` animation defined inline in `<style>`.
- **Gradient Typewriter Text** — The typed text uses `background: linear-gradient(90deg, #818cf8, #34d399)` with `-webkit-background-clip: text` — an indigo-to-emerald gradient.

### ⏳ Page Loader — `Loader.tsx`
- **Fast 3-Stage Progress** — Three `setTimeout`s: `setPct(60)` at 100ms, `setPct(100)` at 350ms, `setShow(false)` + `onDone()` at 550ms — total visible time under 600ms.
- **Dual Counter-Rotating Rings** — Outer ring: `spinCW 2.5s linear infinite` (accent + accent-h border colors). Inner ring: `spinCCW 1.8s linear infinite` (green border). Center: a `rounded-2xl` "PT" badge with accent gradient background and `0 0 40px var(--accent-glow)` box-shadow glow.
- **Gradient Progress Bar** — Fill uses `linear-gradient(90deg, var(--accent), var(--green))` — 3px height, accent-to-green.
- **CSS Pointer Events None** — `pointerEvents: 'none'` applied to the loader div, so page content below is immediately interactive after the loader fades.

### 🧭 Navbar — `Navbar.tsx`
- **MarqueeBar-Aware Background Trigger** — Instead of a fixed scroll pixel, the Navbar tracks when the MarqueeBar's `getBoundingClientRect().bottom <= 110` to switch from transparent to a frosted-glass background — ensuring the transition aligns with the actual page structure.
- **Dual-Color System** — Over the hero video (transparent bg): links are `rgba(255,255,255,0.8)`, active link is `rgba(255,255,255,1)`, icons are `rgba(255,255,255,0.85)`. After scroll: links use `var(--text2)`, active uses `var(--accent-h)` — cleanly adapting between the dark video and the page content background.
- **Active Section Tracking** — `useActiveSection` hook (defined in `Navbar.tsx`) loops through all 7 section IDs on every scroll event, checking `getBoundingClientRect().top - 64 <= 0` to determine the current section. Resets to `"home"` if `scrollY < 50`.
- **Animated Underline** — Active nav link renders a `2px` underline that animates `width: 0 → 60%` via CSS `transition: width 0.3s ease`.
- **`ready` Prop Gate** — `Navbar` accepts a `ready: boolean` prop from `page.tsx`. When `true`, it applies `navSlideDown 0.65s cubic-bezier(0.34,1.56,0.64,1) 0.1s both` entrance animation — synchronized with the Loader's `onDone` callback.
- **Mobile 2-Column Grid Menu** — Mobile nav renders links in a `grid grid-cols-2` with active state highlighted via `rgba(99,102,241,0.12)` background and `rgba(99,102,241,0.25)` border — with a glowing dot indicator per active item.
- **Resume Download Button** — A gradient CTA button (`linear-gradient(135deg, var(--accent), var(--accent-h))`) with a `nudgeDown 1.5s ease infinite` bouncing `↓` arrow renders in both desktop nav and mobile menu.

### 🎠 Projects Section — `Projects.tsx`
- **Framer Motion Horizontal Scroll Carousel** — On desktop (`lg:`), projects render as a `overflow-x: hidden` container with Framer Motion `useScroll` + `useTransform` mapping scroll progress to `x` translation — a sticky horizontal scroll-driven carousel.
- **Mobile Stacked Grid** — On mobile (`< lg`), `useIsMobile()` hook detects `window.innerWidth < 1024` and renders cards in a vertical stack instead of the carousel.
- **Per-Card Color Accent System** — Each project card has a `color` field in `data/index.ts`. The card renders a `linear-gradient(90deg, ${p.color}, ${p.color}44)` top border line with `boxShadow: 0 1px 10px ${p.color}55` glow — each project has a unique visual identity.
- **Zero-Padded Counter** — Cards display `"01 / 05"` style counters via `String(i+1).padStart(2, '0')`.
- **`AnimatePresence` Hover Detail** — On hover, additional project metadata (tech tags, action links) animates in via `AnimatePresence` with Framer Motion `opacity/y` transitions.
- **Framer Motion `useInView`** — Each card uses `useInView(ref, { once: true })` for a scroll-gated entrance animation, firing only once per card.
- **5 Projects** — Access Copilot, Nova Shop, Doctor Booking App, Color Palette Website, Nike Landing Page — each with image, emoji, title, description, tech tags, GitHub link, and live link.

### 🧩 Skills Section — `Skills.tsx`
- **`useReveal` with `IntersectionObserver`** — A `useReveal` hook queries all `.sk-card` elements and observes them with `{ threshold: 0.07, rootMargin: '0px 0px -30px 0px' }`. On intersection, it sets `opacity: 1` and `transform: translateY(0)` directly via `style` — no class toggling, pure inline style updates. Cards stagger by `index * 60ms` via their CSS `transition` delay.
- **Per-Card Color Theming** — Each `SkillCard` has a unique `color` from `skillCategories` data. Hover updates `borderColor` to `cat.color + '55'` and `boxShadow` to `0 12px 40px ${cat.color}18`. Skill pills on hover change `color`, `borderColor`, and `background` to category-specific values.
- **Top Accent Bar** — Each card has a `linear-gradient(90deg, cat.color, cat.color + '00')` 2px top border fading from full color to transparent.
- **Background Glow Blob** — A `blur-xl` circle at `-top-8 -right-5` with `cat.color + '0c'` opacity creates a subtle ambient glow behind each card's content.
- **Skill Count Badge** — A monospace rounded badge shows the skill count per category in category color.
- **Total Skill Counter** — Section header computes `totalSkills` dynamically via `skillCategories.reduce()` and displays it as `"{n}+ Skills"` with a category count stat.
- **6 Categories, 40+ Skills** — Frontend Core, React Ecosystem, Styling & UI, Tools & Platforms, Backend & Services, AI Dev Tools.

### 👤 About Section — `About.tsx`
- **3D Perspective Mouse-Reactive Profile Card** — On `mousemove`, the card computes `dx = (x - width/2) / (width/2)` and `dy = (y - height/2) / (height/2)`, then applies `perspective(700px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg)` — max ±5° tilt. Sets `--mx` and `--my` CSS custom properties for the radial spotlight.
- **Radial Spotlight Effect** — An `.about-spotlight` overlay with `radial-gradient(260px circle at var(--mx) var(--my), rgba(255,255,255,0.06), transparent 70%)` follows the cursor inside the card using CSS custom properties set from `mousemove`.
- **Conic Gradient Glow Ring** — The card's wrapper has an `.about-card-glow` layer with `conic-gradient(from 0deg, transparent 20%, var(--accent) 40%, var(--green) 60%, transparent 80%)` animating via `aboutGlowPulse 3s ease-in-out infinite` (opacity 0.25 → 0.45).
- **`aboutCardEntry` Entrance** — The card animates from `{ opacity: 0, translateY(24px), scale(0.97) }` via `aboutCardEntry 0.75s cubic-bezier(0.22,1,0.36,1) both`.
- **Hover Image Scale** — The profile image inside the card scales to `1.04` on card hover via CSS transition on `.about-card:hover .about-card-img img`.
- **Name + Role + Availability Badge** — An absolute-positioned footer strip at the card's bottom shows name, role in `var(--accent-h)`, and a pulsing emerald `Available` badge with `rgba(16,217,160,0.12)` background.
- **4 Info Chips** — Location, Email, Phone, Status displayed as neumorphic `neu-out-sm` chips with emoji icons and `var(--accent)` gradient icon backgrounds.
- **7 Social Links** — GitHub, LinkedIn, YouTube, Instagram, LeetCode, WhatsApp, Facebook — color-coded on hover using per-social `color` values from `data/index.ts`.

### 🏢 Experience Section — `Experience.tsx`
- **`exp-rv` CSS Reveal** — `.exp-rv` elements start at `opacity: 0; transform: translate3d(-24px, 0, 0)` — sliding in from the left. `IntersectionObserver` adds `.in` class. Hover further moves the inner content `translate3d(4px, 0, 0)` for a subtle nudge effect.
- **Type Icon Map** — Emoji icons mapped to work type: `'Self-Initiative': '</>'`, `'Internship': '{ }'`, `'Freelance': '🖥️'`, `'Community': '⚡'`.
- **Current Role Badge** — Experience entries with `current: true` display a pulsing `Current` indicator.

### 🎓 Education + Certifications — `Education.tsx` + `Certifications.tsx`
- **`edu-rv` CSS Reveal** — Education entries slide in from `translate3d(24px, 0, 0)` (right side — opposite of Experience) with staggered `--edu-d` CSS custom property delays.
- **`cert-rv` CSS Reveal** — Certifications animate from `translate3d(0, 18px, 0)` (upward) and on hover apply `translate3d(0, -6px, 0)` — floating card lift effect.
- **3 Certifications** — JavaScript Complete Guide (CodeChef 2024), Basic CSS (HackerRank 2026), Basic JavaScript (HackerRank 2026) — each with external link to certificate.
- **Certifications Rendered Inside Education** — `Certifications` component is imported and rendered at the bottom of `Education.tsx`, creating a unified academic + credentials section.

### 📬 Contact Section — `Contact.tsx`
- **EmailJS Integration** — `emailjs.send('service_n6ghdki', 'template_piwiz6w', payload, process.env.NEXT_PUBLIC_EMAILJS_KEY)` sends form data directly from the browser — no backend required.
- **Auto-Save Draft** — `store.draft.save(updatedFormData)` fires via `setTimeout(..., 700)` on every input change — debounced by 700ms. On mount, `store.draft.get()` restores any existing draft and shows a `"💾 Draft restored"` notification for 2.8 seconds.
- **Debounced Auto-Save Note** — After each save, `"✅ Auto-saved"` notification appears for 1.8 seconds. The timer ref `timer.current` is cleared on every keystroke to prevent overlap.
- **Client-Side Validation** — Name required, email must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, message required. Errors render as `text-[11px]` red labels per field.
- **Success State** — On successful submission, a `🎉 Message Sent!` confirmation with a `scaleIn` CSS animation replaces the form. A "Send Another →" button resets the state.
- **4 Contact Info Chips** — Email, Phone, Location, Status displayed as neumorphic cards with gradient icon backgrounds and staggered `IntersectionObserver`-driven entrance animations.
- **`useInView` Entrance** — The entire section uses `useInView({ threshold: 0.05 })` — the heading, info column, and form column each animate in with `opacity/transform` transitions at staggered CSS delays (0.15s, 0.25s).

### 🔄 Infinite Marquee Bar — `MarqueeBar.tsx`
- **Doubled Array Trick** — `[...SKILLS, ...SKILLS]` duplicates the 14-item array, and the `.marquee-track` CSS class scrolls it continuously — when the first copy scrolls out, the second is already in place, creating a seamless loop with no JavaScript timer.
- **14 Tech Icons** — React.js, TypeScript, Tailwind CSS, GSAP, Framer Motion, Vite, Redux, MongoDB, GitHub, Firebase, JavaScript, CSS3, HTML5, Git — each with a `react-icons` icon and accent dot separator.

### ↑ Circular Scroll-to-Top Button — `Footer.tsx`
- **SVG Circle Progress Ring** — The `ScrollToTop` component renders two SVG `<circle>` elements: a background track and a `strokeDashoffset` progress arc. `strokeDashoffset = C * (1 - prog)` where `C = 2π × 18` — the circumference. As `useScrollProgress()` increases, the arc fills clockwise.
- **Appears at 400px Scroll** — The button only renders when `useScrollY() > 400`, animated in with `fadeInScale 0.3s cubic-bezier(0.34,1.56,0.64,1)`.
- **`react-scroll` Footer Navigation** — All footer nav links use `<Link to={id} smooth duration={700} offset={-64}>` from `react-scroll` for smooth scroll to each section.

### 🌗 Theme System — `ThemeContext.tsx`
- **`ThemeProvider` + `useTheme` Hook** — `ThemeProvider` wraps the app in `layout.tsx`. On mount, reads `localStorage.getItem('theme')`. On toggle, calls `document.documentElement.setAttribute('data-theme', theme)` and saves to `localStorage`.
- **Hydration-Safe** — A `mounted` state gate prevents the server/client mismatch: children render as `visibility: hidden` until the first `useEffect` fires on the client.
- **Dual CSS Token Sets** — `[data-theme='light']` and `[data-theme='dark']` in `globals.css` define complete `--bg0`–`--bg3`, `--text1`–`--text3`, `--accent`, `--accent-h`, `--green`, `--border`, `--neu-out`, `--neu-in-sm` values. Light mode uses warm beige/tan (`--bg0: #faf8f4`), dark uses deep navy (`--bg0: #06080f`).

### ⚡ Performance & Architecture
- **`store.ts` LocalStorage Abstraction** — A typed `store` object with `draft.get()`, `draft.save()`, `draft.clear()` methods. Uses `try/catch` on `JSON.parse` and stores under `"contact_draft"` key.
- **3 Custom Hooks in `hooks/index.ts`** — `useScrollY` (passive scroll listener, returns `scrollY` number), `useScrollProgress` (0–1 ratio), `useInView<T>` (generic `IntersectionObserver` returning `[ref, inView]` tuple).
- **`next/font/google`** — Inter loaded via `next/font/google` with CSS variable injection (`--font-inter`) for zero layout shift.
- **Tailwind CSS v4 via `@tailwindcss/postcss`** — Uses the new PostCSS-based Tailwind v4 pipeline with `@tailwindcss/vite` devDependency. No `tailwind.config.ts` required for the base setup.
- **Next.js 16 + React 19** — Latest stable versions of both Next.js and React.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | App Router, SSR, `next/font/google`, favicon config |
| React 19 | Client components, `useState`, `useEffect`, `useRef` |
| TypeScript 5 | Full static typing throughout — props, data shapes, hooks |
| Tailwind CSS v4 | Utility-first styling via `@tailwindcss/postcss` PostCSS plugin |
| Framer Motion 11 | `useScroll`, `useTransform`, `AnimatePresence`, `useInView` |
| `@emailjs/browser` | Serverless contact form email delivery |
| react-scroll | Smooth scroll to section IDs via `<Link>` component |
| react-icons v5 | All icons — `FaGithub`, `SiTailwindcss`, `FiDownload`, etc. |
| lucide-react | Secondary icon set |
| clsx + tailwind-merge | Conditional and conflict-free class name composition |
| CSS Custom Properties | Full neumorphic design system — dark + light token sets |

---

## 📁 Project Structure

```
My-Portfolio/
├── public/
│   ├── favicon.png                          # Site favicon
│   ├── About_Img.webp                       # Profile photo used in About section card
│   ├── projects/                            # Project screenshot images
│   │   ├── accesscopilot.png
│   │   ├── colorpalette.png
│   │   ├── doctor.png
│   │   ├── nike.png
│   │   └── novashop.png
│   └── sequence/                            # 108 WebP frame images for scroll sequence
│       ├── frame_000_delay-0.055s.webp
│       ├── frame_001_delay-0.055s.webp
│       └── ... (frame_000 → frame_107)
│
├── src/
│   ├── app/
│   │   ├── globals.css                      # CSS custom property design system —
│   │   │                                    #   [data-theme='dark'] + [data-theme='light']
│   │   │                                    #   token sets, .section-wrap, .g-text, .neu,
│   │   │                                    #   .neu-sm, .neu-in-sm, .field, .field.err,
│   │   │                                    #   .marquee-wrap, .marquee-track keyframe
│   │   ├── layout.tsx                       # Root layout — Inter font, ThemeProvider wrapper,
│   │   │                                    #   Metadata (title, description, favicon)
│   │   └── page.tsx                         # Home — Loader (onDone → setReady), Navbar(ready),
│   │                                        #   ScrollyCanvas, MarqueeBar, About, Skills,
│   │                                        #   Projects, Experience, Education, Contact, Footer
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                   # Scroll-aware frosted glass, active section tracking,
│   │   │   │                                #   dual-color link system, ready-gated slide-down,
│   │   │   │                                #   2-col mobile grid menu, Resume download CTA
│   │   │   └── Footer.tsx                   # react-scroll nav links, 7 social icons,
│   │   │                                    #   SVG circle progress scroll-to-top button,
│   │   │                                    #   SocialIcon + ScrollToTop exported components
│   │   ├── sections/
│   │   │   ├── About.tsx                    # 3D tilt card (±5° perspective), radial spotlight,
│   │   │   │                                #   conic glow ring, hover image scale, name/role/
│   │   │   │                                #   availability strip, 4 info chips, 7 social icons
│   │   │   ├── Skills.tsx                   # IntersectionObserver staggered reveal, per-category
│   │   │   │                                #   color accent hover, skill pill hover coloring,
│   │   │   │                                #   count badge, total skill counter
│   │   │   ├── Projects.tsx                 # Framer Motion horizontal scroll carousel (desktop),
│   │   │   │                                #   mobile stacked grid, per-card color accents,
│   │   │   │                                #   AnimatePresence hover detail, useInView entrance
│   │   │   ├── Experience.tsx               # exp-rv left-slide IntersectionObserver reveal,
│   │   │   │                                #   type icon map, current role badge
│   │   │   ├── Education.tsx                # edu-rv right-slide reveal, Certifications inline
│   │   │   ├── Certifications.tsx           # cert-rv upward reveal, hover float lift,
│   │   │   │                                #   3 certifications with external links
│   │   │   └── Contact.tsx                  # EmailJS form, 700ms debounced auto-save draft,
│   │   │                                    #   draft restore on mount, field validation,
│   │   │                                    #   success state, useInView staggered entrance
│   │   ├── ui/
│   │   │   ├── Loader.tsx                   # 3-stage progress, dual counter-rotating rings,
│   │   │   │                                #   "PT" badge glow, gradient bar, pointer-events none
│   │   │   └── MarqueeBar.tsx               # Doubled-array infinite scroll, 14 tech icons,
│   │   │                                    #   accent dot separators
│   │   ├── ScrollyCanvas.tsx                # 108-frame WebP preloader, Framer Motion useScroll
│   │   │                                    #   + useTransform frame mapping, object-fit-cover
│   │   │                                    #   canvas renderer, 500vh sticky container
│   │   └── Overlay.tsx                      # 3 scroll-reactive Framer Motion panels, inline
│   │                                        #   useTypewriter hook, glassmorphism name card,
│   │                                        #   gradient typewriter text, pulse dot, scroll cue
│   │
│   ├── context/
│   │   └── ThemeContext.tsx                 # ThemeProvider, useTheme hook, data-theme attribute,
│   │                                        #   localStorage persistence, hydration-safe mount gate
│   │
│   ├── data/
│   │   └── index.ts                         # All static data — personal, Resume link, phrases (7),
│   │                                        #   socials (7), stats (3), skillCategories (6, 40+ skills),
│   │                                        #   projects (5), experience (1), education (3),
│   │                                        #   certifications (3)
│   │
│   ├── hooks/
│   │   └── index.ts                         # useScrollY — passive scroll listener
│   │                                        #   useScrollProgress — 0–1 scroll ratio
│   │                                        #   useInView<T> — generic IntersectionObserver
│   │                                        #   returning [ref, inView] tuple
│   │
│   └── utils/
│       └── store.ts                         # Typed localStorage abstraction — draft.get(),
│                                            #   draft.save(), draft.clear() under 'contact_draft'
│
├── next.config.ts                           # Next.js config (minimal — no custom headers)
├── postcss.config.mjs                       # PostCSS — @tailwindcss/postcss
├── tsconfig.json                            # TypeScript — @/* path alias
├── eslint.config.mjs                        # ESLint — eslint-config-next
└── package.json                             # Dependencies and npm scripts
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+. An EmailJS account with a configured service and template is needed for the contact form.

**1. Clone the repository**
```bash
git clone https://github.com/tripathipawan/My-Portfolio.git
cd My-Portfolio
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure EmailJS**

Create a `.env.local` file in the root and add your EmailJS public key:

```env
NEXT_PUBLIC_EMAILJS_KEY=your_emailjs_public_key
```

Get your key from [EmailJS Dashboard](https://dashboard.emailjs.com) → Account → Public Key. The service ID (`service_n6ghdki`) and template ID (`template_piwiz6w`) are already configured in `Contact.tsx`.

**4. Add the frame sequence (required for hero)**

Place 108 WebP frame images in `/public/sequence/`:
```
public/sequence/frame_000_delay-0.055s.webp
public/sequence/frame_001_delay-0.055s.webp
...
public/sequence/frame_107_delay-0.055s.webp
```

**5. Start the development server**
```bash
npm run dev
```

**6. Build for production**
```bash
npm run build
npm run start
```

---

## 🎮 Page Sections

| Section | ID | Signature Feature |
|---|---|---|
| **Loader** | — | Dual counter-rotating rings, "PT" glow badge, 3-stage progress |
| **ScrollyCanvas** | `#home` | 108-frame WebP scroll sequence, 3-panel Framer Motion overlay |
| **Marquee Bar** | — | Doubled-array infinite scroll, 14 tech icons |
| **About** | `#about` | 3D mouse-tilt card, conic glow ring, radial spotlight, hover image scale |
| **Skills** | `#skills` | IntersectionObserver staggered reveal, per-category color hover system |
| **Projects** | `#projects` | Framer Motion horizontal carousel (desktop), per-card color accents |
| **Experience** | `#experience` | Left-slide IntersectionObserver reveal, type icon map |
| **Education** | `#education` | Right-slide reveal + inline Certifications with float-lift hover |
| **Contact** | `#contact` | EmailJS form, 700ms debounce draft auto-save, restore on mount |
| **Footer** | — | react-scroll links, SVG circle scroll-to-top progress ring |

---

## 🧠 Architecture Highlights

| Concern | Implementation |
|---|---|
| Frame Sequence | 108 `HTMLImageElement` preloaded → Framer Motion `useTransform` maps `scrollYProgress` to frame index → `.on('change', renderFrame)` — zero React state during scroll |
| Canvas Renderer | `scale = Math.max(canvas.w / img.w, canvas.h / img.h)` — `object-fit: cover` logic in plain canvas 2D API |
| Scroll Text Panels | `useTransform(scrollYProgress, keyframes, values)` per panel — Framer Motion MotionValues chain directly, no state |
| Typewriter | Inline `useTypewriter` in `Overlay.tsx` — `wordIdx`, `charIdx`, `deleting`, delete speed = `speed / 2` |
| Draft Auto-Save | 700ms debounce via `setTimeout` + `useRef` timer — `store.draft.save()` on input, `store.draft.get()` on mount |
| Theme System | `data-theme` on `<html>` + CSS custom properties — `ThemeProvider` with `mounted` gate for SSR safety |
| Skills Reveal | `IntersectionObserver` sets `el.style.opacity/transform` directly — `index * 60ms` CSS transition delay per card |
| Circular Progress | SVG `strokeDashoffset = C * (1 - prog)` where `C = 2πr` — pure SVG math, no animation library |

---

## 🌱 What I Learned

- Building a 108-frame scroll-driven video sequence using HTML Canvas, `HTMLImageElement` preloading, and Framer Motion's `useScroll` + `useTransform` MotionValues — without any scroll animation library
- Implementing CSS `object-fit: cover` behavior manually in Canvas 2D API for responsive frame rendering at any viewport size
- Creating multiple independent scroll-reactive text panels composited over a canvas using `useTransform` with per-panel keyframe arrays on a shared `scrollYProgress` MotionValue
- Building a 3D perspective mouse-tracking card with CSS custom property-based radial spotlight using `--mx` and `--my` variables set from `mousemove`
- Implementing a dual-token CSS design system for dark/light theming entirely through CSS custom properties with a single `data-theme` attribute
- Designing an `IntersectionObserver`-based scroll reveal system that sets inline styles directly — with per-element CSS transition delay for stagger effects, no GSAP needed

---

## 👨‍💻 Author

**Pawan Tripathi**
- GitHub: [@tripathipawan](https://github.com/tripathipawan)
- LinkedIn: [Pawan Tripathi](https://www.linkedin.com/in/pawantripathi)
- YouTube: [@tripathidevlab](https://youtube.com/@tripathidevlab)
- Email: tripathipawan8705@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
