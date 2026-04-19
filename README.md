# Magic Inspection / Photonxy AI — marketing site

A single-viewport marketing site with animated section-to-section transitions
and corner-wedge accents, deployed at <https://magic-inspection.com/>. Built in
Next.js 15 + React 19 + Tailwind CSS + Framer Motion, exported as a static site
and served by nginx on a Raspberry Pi behind Cloudflare.

The repository hosts two brands of the same design, on two branches:

| Branch        | Brand            | Logo source  | Hero wordmark      |
| ------------- | ---------------- | ------------ | ------------------ |
| `main`        | Magic Inspection | `Logo/2.png` | `MAGIC INSPECTION` |
| `photonxy-ai` | Photonxy AI      | `Logo/4.png` | `PHOTONXY AI`      |

Everything else — design, transitions, sections, copy, palette — is identical.

## Stack

- **Next.js** 15.1 with the App Router, configured for **static export** via
  `output: "export"` in `next.config.mjs`.
- **React** 19, **TypeScript** 5.
- **Tailwind CSS** 3.4 for utility styling.
- **Framer Motion** 12 for panel enter/exit transitions.
- **Inter** (via `next/font/google`) as the UI typeface.
- **PostCSS** + **Autoprefixer**.

See `package.json` for exact versions.

The site's palette matches <https://demo.magic-inspection.com/>:
`--bg #0a0e14`, `--accent #4cc2ff` (cyan), `--accent-2 #7c3aed` (violet),
`--text #e6edf5`, `--muted #8b97a8`, `--line #1f2937`. The same cyan → violet
linear gradient is used by the "Open app" CTA, the hero scroll pentagon, and
the corner wedges on content sections.

## Local development

Prerequisites: **Node.js 18.18+** (Node 20 LTS recommended), **npm**, and
optionally `make` + `python3` for the Makefile workflow.

```bash
git clone git@github.com:behnamasadi/magic-inspection.com.git
cd magic-inspection.com

# pick a brand
git checkout main          # Magic Inspection
# or
git checkout photonxy-ai   # Photonxy AI

make install               # or: npm install
make dev                   # or: npm run dev
```

Open <http://localhost:3000>. If 3000 is busy, Next will fall back to 3001,
3002, etc. — check the terminal for the actual URL.

To preview the **production build** (static export) locally:

```bash
make preview               # builds out/ and serves it on http://localhost:8085
```

Without `make`, you can also run:

```bash
npm run build              # static export to out/
cd out && python3 -m http.server 8085
```

## Deployment

The site is deployed as a static export served by nginx on the Raspberry Pi at
`192.168.1.2` (`pie-server`), fronted by Cloudflare on
`magic-inspection.com`.

### One-shot deploy

```bash
make deploy
```

This runs:

1. `npm run build` → static files in `out/`.
2. `rsync -az --delete` to `behnam@192.168.1.2:/var/www/magic-inspection-site/`.
3. `make verify` — curls the origin (bypassing Cloudflare) and the public URL.

Day-to-day content changes (copy, images, styling) only need `make deploy`.
No sudo, no nginx change, no SSH prompts — `rsync` pushes the files, nginx
serves them immediately.

### Nginx vhost changes

The live nginx vhost is version-controlled at
`infra/nginx/magic-inspection.com.conf`. When you edit it, push to the Pi with:

```bash
make deploy-vhost          # backs up the live vhost, installs, nginx -t, reload
```

Rollback the vhost to the most recent backup:

```bash
make rollback
```

A full deploy (files + vhost + nginx restart + verify) is:

```bash
make deploy-full
```

### How sudo works

`make deploy-vhost`, `make rollback`, `make reload-nginx`, `make restart-nginx`,
and `make logs-*` all need sudo on the Pi. The Makefile pulls the Pi's sudo
password from the local GNOME keyring and pipes it into `sudo -S` over SSH:

```bash
secret-tool lookup service sudo host pie-server user behnam \
    | ssh behnam@192.168.1.2 'sudo -S <command>'
```

One-time setup for a new machine — store the password once:

```bash
secret-tool store --label="pie-server sudo" \
    service sudo host pie-server user behnam
```

See `/home/behnam/Documents/Linux Tips/sudo-over-ssh.md` for the full pattern,
including how to revoke and the alternative `NOPASSWD` / `sudo -A` approaches.

### Cache busting

Cloudflare caches static assets aggressively. The site uses two mechanisms:

- **HTML** — the origin doesn't set long cache headers for HTML, so
  Cloudflare refreshes it on a short TTL. A cache-busted curl
  (`?cb=$(date +%s)`) always hits origin, which is what `make verify` uses.
- **Images** — the `components/Logo.tsx` component appends a `LOGO_VER`
  query string (e.g. `/logo-icon.png?v=2`) so any asset change produces a new
  URL and avoids Cloudflare's edge cache. Bump `LOGO_VER` when you change the
  PNG.

To purge Cloudflare's cache explicitly (requires a token with Cache Purge
scope stored at `service cloudflare user behnam.asadi@gmail.com` in the
keyring):

```bash
make purge-cache
```

### Verification

```bash
make verify
```

Prints the HTTP status and byte count for both the origin (direct, bypasses
Cloudflare via `--resolve magic-inspection.com:443:192.168.1.2`) and the
public URL through Cloudflare. A healthy deploy shows `HTTP 200` on both.

### Rollback

- **Content (files only)** — static export is idempotent; if a bad build
  shipped, revert the source commit, run `make deploy` again.
- **Nginx vhost** — `make rollback` restores the most recent
  `/etc/nginx/sites-available/magic-inspection.com.bak-YYYYMMDD-HHMMSS` backup
  and reloads nginx. Backups are created automatically by `make deploy-vhost`.

## Makefile reference

Run `make help` for the authoritative list. Current targets:

| Target             | What it does                                                  |
| ------------------ | ------------------------------------------------------------- |
| `make install`     | `npm install`                                                 |
| `make dev`         | Next.js dev server on `:3000`                                 |
| `make build`       | Static export → `out/`                                        |
| `make preview`     | Build + serve `out/` on `:8085`                               |
| `make clean`       | Remove `.next` and `out/`                                     |
| `make deploy`      | Build + rsync to Pi + verify (main day-to-day command)        |
| `make deploy-files`| Build + rsync (no verify)                                     |
| `make deploy-vhost`| Upload `infra/nginx/magic-inspection.com.conf`, back up, reload |
| `make deploy-full` | Files + vhost + restart nginx + verify                        |
| `make reload-nginx`| `systemctl reload nginx` on the Pi                            |
| `make restart-nginx`| `systemctl restart nginx` on the Pi                          |
| `make verify`      | curl origin + public URL                                      |
| `make rollback`    | Restore most recent vhost backup + reload                     |
| `make purge-cache` | Purge Cloudflare cache for the zone                           |
| `make ssh`         | Open an interactive SSH session to the Pi                     |
| `make logs-access` | Tail `/var/log/nginx/access.log` on the Pi                    |
| `make logs-error`  | Tail `/var/log/nginx/error.log` on the Pi                     |

Most settings are overridable on the command line, e.g.:

```bash
make deploy REMOTE_HOST=192.168.1.99 REMOTE_ROOT=/srv/staging
```

## Navigating the site

- **Scroll** (mouse wheel / trackpad), **Arrow keys**, **PageUp/PageDown**, or
  **Space** to move between sections.
- **Touch swipe** on mobile.
- The gradient pentagon on the hero and the side-navigator chevrons on content
  sections advance / go back.
- **Right-side dots** jump directly to a section.

### Keyboard shortcuts

| Key                                    | Action                   |
| -------------------------------------- | ------------------------ |
| `ArrowDown` / `ArrowRight` / `Space`   | Next section             |
| `ArrowUp` / `ArrowLeft` / `PageUp`     | Previous section         |
| `PageDown`                             | Next section             |
| `Escape`                               | Close the poster overlay |

## Project layout

```
app/
  globals.css          Tailwind + :root CSS variables for the theme
  layout.tsx           <html>, metadata, Inter font, body wrapper
  page.tsx             Root composition — Nav, TravelBoard, CopyrightBar
components/
  TravelBoard.tsx      Panel state machine + framer-motion transitions
  Wedge.tsx            Angular corner shape with SVG linearGradient fill
  Nav.tsx              Fixed header (logo + Demo / Open app links)
  Logo.tsx             <img> for /logo.png or /logo-icon.png with ?v= cache bust
  Poster.tsx           Full-screen "Learn more" overlay per section
  CopyrightBar.tsx     Small bottom-left line
  sections.ts          All section content + per-section wedge config
public/
  logo.png             Brand logo (icon-only crop with transparent bg)
  logo-icon.png        Header-sized icon crop
  media-*.svg          Per-section themed placeholder media
  placeholder.svg      Generic fallback
infra/
  nginx/
    magic-inspection.com.conf   Versioned source of the production vhost
Logo/                  Source brand assets (1.png .. 4.png)
Makefile               Build, deploy, nginx ops (see `make help`)
tailwind.config.ts     Brand color tokens (bg, accent, accent-2, muted, …)
next.config.mjs        output: "export", trailingSlash, images.unoptimized
```

## Customization

### Change copy, section order, or images

Edit `components/sections.ts`. Each entry has:

- `title`, `tagline`, `bullets` — copy for the section and its `Learn more`
  poster.
- `image`, `posterImage` — media alongside the text and in the poster. Any
  file under `public/` works (`.svg`, `.jpg`, `.png`, `.mp4`, `.webm`).
- `wedgeCorner` — `"top-right"`, `"top-left"`, `"bottom-center"`, or `"none"`.
- `wedgeColor` — `"ember"`, `"flame"`, `"peach"`, or `"none"` (names are
  semantic only; all wedges render the same cyan → violet gradient).

### Change theme colors

Edit the CSS variables in `app/globals.css` `:root`:

```css
:root {
  --bg:       #0a0e14;
  --accent:   #4cc2ff;
  --accent-2: #7c3aed;
  /* ... */
}
```

All wedges, the "Open app" CTA, and the section dots pull from these. To
change the wedge gradient, swap `--accent` and `--accent-2`.

### Replace the logo

1. Drop a new PNG at `public/logo.png` (and an icon crop at
   `public/logo-icon.png`). Transparent background recommended for the dark
   site.
2. Bump `LOGO_VER` in `components/Logo.tsx` so browsers and Cloudflare fetch
   the new URL instead of the old cached one.
3. `make deploy`.

### Use real video instead of a placeholder

In `components/TravelBoard.tsx`, the `MediaBlock` component renders
`<img src={src} />`. Switch to `<video>` when `src` ends in `.mp4`/`.webm`:

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

Drop the file into `public/media/site.mp4`, point any `image` field in
`sections.ts` at `/media/site.mp4`, `make deploy`.

## Branching strategy

```
main            → Magic Inspection brand
photonxy-ai     → Photonxy AI brand
```

Both branches share the same design system. Only `components/Logo.tsx` alt
text, `components/CopyrightBar.tsx`, `app/layout.tsx` title, the hero wordmark
in `components/TravelBoard.tsx`, and the `public/logo*.png` assets differ.

To port a design-level change from one brand to the other:

```bash
git checkout photonxy-ai
git checkout main -- components/sections.ts public/media-*.svg infra/
# review, then commit
```

## Notes

- There is no external CMS, analytics, or tracking code in this repository.
- The `Logo/` folder contains source brand assets and is committed — only
  `public/` files are served by the site.
- The hero `MAGIC INSPECTION` / `PHOTONXY AI` wordmark is a hard-coded pair
  of `<h1>` elements in `components/TravelBoard.tsx`; it is not pulled from
  `sections.ts` so it can use a bespoke two-line layout.
- Cloudflare proxies `magic-inspection.com`; origin access is locked down by
  UFW to the LAN and Cloudflare's published IP ranges. Maintenance scripts
  for the firewall live elsewhere on the Pi — see the Server Documentation
  wiki at `http://192.168.1.2/wiki/` (LAN-only).
