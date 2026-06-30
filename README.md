# Stretch and Chill

Ultra-premium, dreamy pilates studio web experience for Belgrade, Serbia — built with React, Tailwind CSS, and Framer Motion.

## Stack

- **React 19** + **Vite 8** + TypeScript
- **Tailwind CSS v4** — custom dreamy palette, glassmorphism, CSS plaid patterns
- **Framer Motion** — page transitions, floating hero text, magnetic buttons
- **@hello-pangea/dnd** — fluid drag-and-drop schedule → sticky notes
- **React Router** — 2-page SPA

## Run

```bash
cd stretch-and-chill
npm install
npm run dev
```

Visit `http://localhost:5173`

## Pages

| Route | Content |
|-------|---------|
| `/` | Hero, concept grid, classes slider, team cards |
| `/schedule` | Interactive notebook planner with drag-to-save |

## Architecture

```
src/
├── components/
│   ├── home/          Hero, ConceptGrid, ClassesTeam
│   ├── schedule/      NotebookSchedule, BinderSpine, ScheduleCards
│   ├── layout/        Navigation, Layout shell
│   └── ui/            MagneticButton, MotionWrappers
├── data/              schedule.ts, content.ts
├── hooks/             useIsMobile, usePrefersReducedMotion
└── pages/             HomePage, SchedulePage
```

## Key Interactions

- **Magnetic buttons** — subtle cursor-follow spring on hover
- **Drag & drop** — drag class cards into "My Practice" sidebar; transforms into tilted plaid sticky notes
- **Mobile fallback** — tap **+ Add** instead of drag on screens < 768px
- **Binder spine** — CSS iridescent metallic rings (notebook page only)

## Design Notes

Reference mood board aesthetics are translated into CSS — no literal reference images used as backgrounds. Plaid, dotted paper, and floral accents are pure CSS gradients and patterns.
