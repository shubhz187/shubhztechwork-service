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
- **Animations:** Framer Motion for scroll-triggered animations; Remotion for animated banners and section visuals
- **Routing:** React Router DOM v6
- **State/Data:** TanStack React Query; custom Context API for theme (`src/hooks/use-theme.tsx`)
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Testing:** Vitest + jsdom + React Testing Library

## Architecture

**Path alias:** `@/*` maps to `src/*`

**Provider hierarchy** (`src/App.tsx`): `QueryClientProvider` → `ThemeProvider` → `TooltipProvider` → toasters → `BrowserRouter` → Routes.

**Routing** (`src/App.tsx`): Eight routes — `/` (Index), `/services`, `/technologies`, `/about`, `/blogs`, `/blogs/:slug` (BlogPost), `/case-studies`, `/case-studies/:slug` (CaseStudyDetail), plus a catch-all 404. Supports hash navigation for in-page sections (e.g., `/services#fullstack`, `/#contact`).

**Page composition pattern**: Every page follows: `Navbar` → page-specific sections → `Footer`. The homepage (`src/pages/Index.tsx`) composes 8 animated sections: HeroSection → ServicePillarsSection → HowWeWorkSection → CaseStudiesPreviewSection → TechStackSection → WhoWeServeSection → WhyUsSection → ContactSection.

**Data layer** (`src/data/`): Blog posts and case studies are defined as typed arrays with TypeScript interfaces:
- `src/data/blogs.ts` — `BlogPost` interface, `blogPosts` array, `BlogAuthor` records
- `src/data/case-studies.ts` — `CaseStudy` interface (includes `comingSoon?: boolean` flag), `caseStudies` array, helper functions `getCaseStudyBySlug()` and `getRelatedCaseStudies()`

**Content rendering with embedded animations**: Blog and case study HTML content strings use `%%ANIMATION:type%%` markers. The detail page renderers (`BlogPost.tsx`, `CaseStudyDetail.tsx`) split content on this regex (`/%%ANIMATION:(\w+)%%/`) and intersperse Remotion animation components between HTML blocks via `dangerouslySetInnerHTML`.

**Theme system** (`src/hooks/use-theme.tsx`): Custom `ThemeProvider` using Context API with localStorage persistence and system preference detection. Toggled via `ThemeToggle` component. Applied via CSS class on document root.

**Styling architecture** (`src/index.css` + `tailwind.config.ts`): HSL CSS variables define the color system for both light/dark modes. Primary color is orange/red (`hsl(6 93% 64%)`). Two font families: `font-sans` (Inter) for body text, `font-display` (Space Grotesk) for headings. Custom gradients (`--gradient-primary`, etc.), shadows (`--shadow-glow`, etc.), and animation keyframes are defined in CSS and extended in the Tailwind config.

**TypeScript config:** Relaxed checking — `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`.

## Remotion Animation System

The project uses Remotion extensively — not just for hero banners but for section-level visuals throughout the site.

**Composition + Player pattern**: Every animation follows a two-file convention:
- `*Composition.tsx` — Remotion composition using `useCurrentFrame`/`spring`/`interpolate` from `remotion`, plus `AbsoluteFill` and optionally `Img`
- `*Player.tsx` — Wraps the composition in a `@remotion/player` `<Player>` with auto-play, loop, no controls, and `prefers-reduced-motion` respect

**Component domain directories** under `src/components/`:
- `home/` — Hero (full-viewport unified composition with circuit graph + logo + tagline), plus 6 section animations (ServicePillars, HowWeWork, TechMarquee, WhoWeServe, WhyUs, HomeServices)
- `services/` — Hero banner + ServiceIcon compositions
- `blogs/` — Hero banner + 5 topic-specific animations in `animations/` subdirectory
- `case-studies/` — Hero banner + 5 case-study-specific animations in `animations/` subdirectory, mapped via `CaseStudyAnimation.tsx`
- `about/`, `contact/` — Hero banners only

**Remotion conventions**: Dark bg `#0a0a0a`, coral accent `hsl(6, 93%, 64%)`, purple `#a855f7`, pink `#ec4899`. Spring physics typically `damping: 12-14, stiffness: 80-130`. Dot grid backgrounds, glow blobs, and vignette overlays. Standard dimensions: 800x320 for inline animations, 1200x400-700 for section/hero animations, all at 30fps.

**Critical: composition height must accommodate card content.** When Remotion compositions contain cards/grids with absolute positioning, the `compositionHeight` in the Player must be tall enough to avoid clipping. Always verify by calculating: card `top` + card content height + animation `translateY` offset < compositionHeight.

## Key Patterns

- `cn()` utility from `src/lib/utils.ts` merges Tailwind classes (clsx + tailwind-merge) — use it for conditional class composition
- shadcn/ui components are pre-installed in `src/components/ui/` — use existing components rather than adding new UI primitives
- Framer Motion `motion.*` elements with `initial`/`whileInView`/`viewport={{ once: true }}` for scroll-triggered reveal animations
- Service data uses `iconType` string identifiers mapped to Remotion-rendered icon compositions in `ServiceCard`
- Responsive layouts use Tailwind's grid system (1/2/3 column breakpoints: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Case studies support a `comingSoon: true` flag that shows a "Coming Soon" badge on cards and a poster treatment on the detail page instead of full content
- This project was scaffolded with Lovable (lovable.dev); the `lovable-tagger` dev plugin runs in development mode only

## Domain Context

This is a marketing/portfolio website for **ShubhzTechWork**, a technology services company. Content covers service categories (Infrastructure, Security, DevOps/SRE, Graphics, IT Solutions, Gen AI), technology showcases, a blog section, and case studies across FinTech, HealthTech, E-Commerce, Cybersecurity, and Healthcare verticals.
