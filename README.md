# Magic Inspection / Photonxy AI — marketing site

A single-viewport marketing site with animated section-to-section transitions,
corner-wedge accents, and a runtime theme switcher. Built in Next.js 15 + React
19 + Tailwind CSS + Framer Motion.

The repository hosts two brands of the same design, on two branches:

| Branch        | Brand           | Logo               | Hero wordmark     |
| ------------- | --------------- | ------------------ | ----------------- |
| `main`        | Magic Inspection | `Logo/2.png`      | `MAGIC INSPECTION` |
| `photonxy-ai` | Photonxy AI      | `Logo/4.png`      | `PHOTONXY AI`      |

Everything else — design, transitions, sections, copy, theme switcher — is
identical across the two branches.

## Stack

- **Next.js** 15.1 (App Router, static export-friendly)
- **React** 19
- **TypeScript** 5
- **Tailwind CSS** 3.4
- **Framer Motion** 12 — panel enter/exit transitions
- **PostCSS** + **Autoprefixer**

See `package.json` for exact versions.

## Setup (local development)

Prerequisites: **Node.js 18.18+** (Node 20 LTS recommended) and **npm**.

```bash
git clone git@github.com:behnamasadi/magic-inspection.com.git
cd magic-inspection.com

# pick a brand
git checkout main          # Magic Inspection
# or
git checkout photonxy-ai   # Photonxy AI

npm install
npm run dev
```

Open http://localhost:3000 . If 3000 is busy, Next will fall back to 3001, 3002,
etc. — check the terminal for the actual URL.

## Production build

```bash
npm run build   # compile + type-check
npm run start   # serve the production build on port 3000
```

## Navigating the site

- **Scroll** (mouse wheel / trackpad), **Arrow keys**, **PageUp/PageDown**, or
  **Space** to move between sections.
- **Touch swipe** on mobile.
- The red pentagon on the hero and the side-navigator chevrons on content
  sections also advance/go back.
- **Right-side dots** jump directly to a section.
- **Theme swatches** (bottom right) switch the palette live:
  - `Hybrid` — warm hero + cool content (default)
  - `Cool` — blue/violet palette matching the brand logo
  - `Ember` — original red/orange/peach palette with a hue-shifted logo

The selected theme persists in `localStorage`.

## Project layout

```
app/
  globals.css          Tailwind + CSS variables for the three themes
  layout.tsx           <html>, metadata, body wrapper
  page.tsx             Root composition — Nav, TravelBoard, Footer, ThemePicker
components/
  TravelBoard.tsx      Panel state machine + framer-motion transitions
  Wedge.tsx            Angular corner shape; colors come from CSS variables
  Nav.tsx              Fixed header (logo only)
  Logo.tsx             <img> for /logo.png or /logo-icon.png with hue filter
  ThemePicker.tsx      Three-swatch picker, bottom-right
  Poster.tsx           Full-screen "Learn more" overlay per section
  CopyrightBar.tsx     Small bottom-left line
  sections.ts          All section content + per-section wedge config
public/
  logo.png             Brand logo with wordmark
  logo-icon.png        Icon-only crop (used in the header)
  media-*.svg          Per-section placeholder media (SVG)
  placeholder.svg      Generic fallback
Logo/                  Source brand assets (1.png .. 4.png)
tailwind.config.ts     Brand color tokens
next.config.mjs        Image / misc Next config
```

## Customization

### Change copy, section order, or images

Edit `components/sections.ts`. Each section entry has:

- `title`, `tagline`, `bullets` — copy shown in the section and its poster
- `image`, `posterImage` — media shown beside the text and in the full-screen
  poster. Replace with any file under `public/` (jpg, png, mp4…).
- `wedgeCorner` — `"top-right"`, `"top-left"`, `"bottom-center"`, or `"none"`
- `wedgeColor` — `"ember"`, `"flame"`, `"peach"`, or `"none"`. These are
  semantic names; their actual hex values come from the active theme.

### Change theme colors

Edit `app/globals.css`. Each theme is a class-scoped block of CSS variables:

```css
.theme-hybrid { --wedge-ember: #dc0f14; --wedge-flame: #3a5fe0; ... }
.theme-cool   { --wedge-ember: #3a5fe0; --wedge-flame: #6a46d0; ... }
.theme-ember  { --wedge-ember: #dc0f14; --wedge-flame: #eb5023; ... }
```

To add a new theme, duplicate a block, give it a new class name
(e.g. `.theme-midnight`), and add an entry to the `THEMES` array in
`components/ThemePicker.tsx`.

### Replace the logo

Drop a new image at `public/logo.png` (and an icon crop at
`public/logo-icon.png`). `components/Logo.tsx` renders whichever is requested
via the `iconOnly` prop.

### Use real video instead of an SVG placeholder

In `components/TravelBoard.tsx`, look for the `MediaBlock` component — it
currently renders `<img src={src} />`. Switch to a `<video>` element when `src`
ends in `.mp4` or `.webm`, e.g.:

```tsx
function MediaBlock({ src }: { src: string }) {
  const isVideo = /\.(mp4|webm)$/i.test(src);
  if (isVideo) {
    return (
      <video
        className="w-full h-full object-cover"
        src={src}
        autoPlay muted loop playsInline
      />
    );
  }
  return <img src={src} alt="" className="w-full h-full object-cover kenburns" />;
}
```

Then point any `image` field in `sections.ts` to a file like `/media/site.mp4`
dropped in `public/media/`.

## Keyboard shortcuts

| Key                                  | Action               |
| ------------------------------------ | -------------------- |
| `ArrowDown` / `ArrowRight` / `Space` | Next section         |
| `ArrowUp` / `ArrowLeft` / `PageUp`   | Previous section     |
| `PageDown`                           | Next section         |
| `Escape`                             | Close the poster overlay |

## Branching strategy

```
main            → Magic Inspection brand
photonxy-ai     → Photonxy AI brand
```

Both branches share the same design system. To port a design-level change from
one brand to the other, copy the relevant files over:

```bash
# from photonxy-ai, pull in a change that was made on main
git checkout photonxy-ai
git checkout main -- components/sections.ts public/media-*.svg
# review, then commit
```

Only `components/Logo.tsx` alt text, `components/CopyrightBar.tsx`,
`app/layout.tsx` title, the hero wordmark in `components/TravelBoard.tsx`, and
the `public/logo*.png` assets differ between the two brands.

## Notes

- There is no external CMS, analytics, or tracking code in this repository.
- The `Logo/` folder contains source brand assets and is committed — only
  `public/` files are served by the site.
- The hero `MAGIC INSPECTION` (or `PHOTONXY AI`) wordmark is a hard-coded
  `<h1>` pair in `components/TravelBoard.tsx`; it is not pulled from
  `sections.ts` so that it can use a bespoke two-line layout.
