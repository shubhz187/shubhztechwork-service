# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build (Vite build)
npm run build:dev    # Development mode build
npm run lint         # ESLint across all files
npm run test         # Run Vitest once
npm run test:watch   # Run Vitest in watch mode
npm run preview      # Preview production build
```

Tests live in `src/**/*.{test,spec}.{ts,tsx}` and use jsdom environment with globals enabled (no need to import `describe`/`it`/`expect`). Setup file: `src/test/setup.ts`.

## Tech Stack

- **Framework:** React 18 + TypeScript + Vite (SWC compiler)
- **Styling:** Tailwind CSS with HSL CSS custom properties for theming (light/dark via `class` strategy on `<html>`)
- **Components:** shadcn/ui (Radix UI primitives) in `src/components/ui/`
- **Animations:** Framer Motion for scroll-triggered animations; Remotion for animated hero banners and some section visuals
- **Routing:** React Router DOM v6
- **State/Data:** TanStack React Query; custom Context API for theme (`src/hooks/use-theme.tsx`)
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Testing:** Vitest + jsdom + React Testing Library
- **Linting:** ESLint flat config (`eslint.config.js`) with typescript-eslint, react-hooks, react-refresh plugins

## Architecture

**Path alias:** `@/*` maps to `src/*`

**Provider hierarchy** (`src/App.tsx`): `QueryClientProvider` → `ThemeProvider` → `TooltipProvider` → toasters → `BrowserRouter` → Routes.

**Routing** (`src/App.tsx`): All routes lazy-loaded via `React.lazy()` — `/` (Index), `/services`, `/technologies`, `/about`, `/blogs`, `/blogs/:slug`, `/case-studies`, `/case-studies/:slug`, `/privacy-policy`, `/terms-of-service`, plus catch-all 404. Supports hash navigation (e.g., `/#contact`, `/services#devops`).

**Page composition pattern**: Every page: `Navbar` → page-specific sections → `Footer`. The homepage (`src/pages/Index.tsx`) composes 8 sections: HeroSection → ServicePillarsSection → HowWeWorkSection → CaseStudiesPreviewSection → TechStackSection → WhoWeServeSection → WhyUsSection → ContactSection.

**Data layer** (`src/data/`):
- `blogs.ts` — `BlogPost` interface, `blogPosts` array, `BlogAuthor` records
- `case-studies.ts` — `CaseStudy` interface (includes `comingSoon?: boolean` flag), `caseStudies` array, `getCaseStudyBySlug()` and `getRelatedCaseStudies()` helpers

**Content rendering with embedded animations**: Blog and case study HTML content strings use `%%ANIMATION:type%%` markers. Detail page renderers (`BlogPost.tsx`, `CaseStudyDetail.tsx`) split on `/%%ANIMATION:(\w+)%%/` and intersperse Remotion components between HTML blocks via `dangerouslySetInnerHTML`.

**Theme system** (`src/hooks/use-theme.tsx`): Custom `ThemeProvider` with localStorage persistence and system preference detection. The `ThemeToggle` component appears in the `Navbar` on all pages.

**Styling architecture** (`src/index.css` + `tailwind.config.ts`): HSL CSS variables for both light/dark modes. Primary color: `hsl(6 93% 64%)` (coral). Two font families: `font-sans` (Inter), `font-display` (Space Grotesk). Key CSS utility classes:
- `.homepage-dark` — Deep-blue override (`--background: 230 70% 2%`) on the homepage `<main>` for cinematic dark feel
- `.glass-card` — Glassmorphism cards (`rgba(255,255,255,0.04)` + backdrop-filter blur)
- `.section-divider-gradient` — Subtle horizontal gradient line at section tops

**Bundle splitting** (`vite.config.ts`): Manual chunks — `vendor-react`, `vendor-motion` (framer-motion), `vendor-remotion` (remotion + @remotion/player).

**TypeScript config:** Relaxed — `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`.

## Remotion Animation System

**Shared hero background** (`src/components/shared/HeroRibbonBackground.tsx`): All 9 page hero sections share this single Remotion composition — flowing SVG ribbons, ambient glow spots, shield/cloud outlines, vignette overlay. Takes an `idPrefix: string` prop to prevent SVG gradient/filter ID collisions when multiple Players exist on the same page. The cycle is FPS-independent (`fps * 10` frames = always 10s).

**Composition + Player pattern**: Most animations follow a two-file convention:
- `*Composition.tsx` — Remotion composition using `useCurrentFrame`/`useVideoConfig`/`spring`/`interpolate`. Adapts layout for `width < 768` (mobile).
- `*Player.tsx` — Wraps in `@remotion/player` `<Player>`. Most section Players use `useResponsivePlayer` hook (`src/hooks/use-responsive-player.ts`) which measures via ResizeObserver. All Players gate rendering via `useInView` hook.

**`useInView` hook** (`src/hooks/use-in-view.ts`): IntersectionObserver-based hook that gates Remotion Player mounting. Default `rootMargin: '800px'` so Players mount well before they're visible (avoids scroll jank). Uses `startTransition` so heavy React tree mounts don't block scroll. Players unmount when off-screen by default (`once: false`) to save memory — set `once: true` to keep mounted.

**Hero Player** (`src/components/home/HeroPlayer.tsx`): Special case — uses `document.documentElement.clientWidth` + `window.innerHeight` directly (not `useResponsivePlayer`) so the composition exactly matches the viewport with no letterboxing. Updates on resize with 150ms debounce.

**Non-Remotion section replacements**: `HowWeWorkRedesign.tsx` (Framer Motion scroll-linked parallax pipeline) and `TechStackRedesign.tsx` (pure CSS marquee, zero JS overhead) replace their former Remotion counterparts for performance.

**Component domain directories** under `src/components/`:
- `home/` — Hero + 5 Remotion section compositions (ServicePillars, WhoWeServe, WhyUs, HomeServices) + 2 Framer/CSS redesigns (HowWeWork, TechStack)
- `shared/` — `HeroRibbonBackground.tsx` (shared across all 9 hero compositions)
- `services/` — Hero + ServiceIcon compositions
- `blogs/` — Hero + 5 topic animations in `animations/` subdirectory
- `case-studies/` — Hero + 5 animations in `animations/` subdirectory, mapped via `CaseStudyAnimation.tsx`
- `about/`, `contact/`, `legal/` — Hero compositions only
- `technologies/` — Hero, TechIconComposition (61 SVG icons), TechCarousel grid

**Remotion conventions**: Dark bg `#010108`, coral accent `#ff6644` / `hsl(6, 93%, 64%)`, blue `#4488ff`, teal `#22ccaa`. Spring physics: `damping: 12-14, stiffness: 80-130`. When text animations should settle once in a looping composition, use `const textFrame = Math.min(frame, 90)` to clamp the frame input.

**Critical: composition height must fit content.** For compositions with absolute-positioned cards, verify: card `top` + content height + max `translateY` offset < `compositionHeight`.

## Technologies Page Architecture

The Technologies page showcases 61 technologies across 7 categories:
- `TechIconComposition.tsx` — 61 custom SVG icons with stroke-dashoffset draw-on animation
- `techIcons.tsx` — maps `TechIconType` identifiers to icon elements using `lucide-react` + `react-icons/si`
- `techData.ts` — `Technology`/`TechCategory` interfaces; 7 categories: Cloud & Infra (11), DevOps & SRE (14), Monitoring (6), Security (10), Databases (5), AI & LLM (11), Contact Center (4)
- `TechCarousel.tsx` — Flex-wrap grid with staggered Framer Motion entrance, hover tooltip

## Key Patterns

- `cn()` from `src/lib/utils.ts` — merge Tailwind classes (clsx + tailwind-merge)
- All Remotion Players must be wrapped in `<RemotionErrorBoundary>` and gate rendering with `useInView`
- Elements inside Remotion `<Player>` are NOT interactive — never put clickable buttons/links inside compositions
- Use `staticFile()` from Remotion for public assets inside compositions (not hardcoded `/` paths)
- SVG gradient/filter IDs inside shared compositions must be prefixed with `idPrefix` prop to avoid collisions
- `SectionHeading` component (`src/components/home/SectionHeading.tsx`) for consistent section heading style in React (non-Remotion) sections
- Contact form (`src/components/ContactSection.tsx`) submits via Web3Forms API with a hardcoded access key
- `.npmrc` has `legacy-peer-deps=true` for CI peer dependency resolution

## Deployment

**Hosting:** GitHub Pages — `services.shubhztechwork.com`

**CI/CD:** `.github/workflows/deploy.yml` — triggers on push to `main`, builds with Node 20, deploys `dist/` via `actions/deploy-pages`.

**SPA routing:** `public/404.html` redirects unknown paths to `index.html` with path as query param; `index.html` `<head>` script restores via `history.replaceState` before React mounts.

**Custom domain:** `public/CNAME` = `services.shubhztechwork.com`. DNS: CNAME `services` → `shubhz187.github.io`.

## Domain Context

Marketing/portfolio site for **ShubhzTechWork**, a technology services company. Service categories: Infrastructure, Security, DevOps/SRE, Graphics, IT Solutions, Gen AI. Case studies span FinTech, HealthTech, E-Commerce, Cybersecurity, Healthcare verticals.
