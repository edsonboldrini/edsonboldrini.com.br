# edsonboldrini.com.br

Personal site of **Edson Boldrini** — software engineer, Vitória, Brazil.

Static-first Next.js site. No database, no backend, no third-party scripts.
It shares a VPS with `cortefilme.com.br`, which it must never disturb.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Server Components) |
| Language | TypeScript, `strict: true`, no `any` |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Fonts | Syne / Source Sans 3 / IBM Plex Mono, self-hosted via `next/font` |
| Runtime | Node 22 (Alpine) in Docker, `output: "standalone"` |
| Edge | nginx on the host, TLS by Let's Encrypt (certbot) |

Every page is prerendered as static HTML. There are **zero client components** —
the whole site works with JavaScript disabled, which is a hard requirement:
its content has to be readable by `curl`, crawlers and LLM agents alike.

## Languages

English (default), Português (Brasil) and Español.

| Language | Home | Case study |
|---|---|---|
| English | `/` | `/work/cortefilme` |
| Português | `/pt-br` | `/pt-br/work/cortefilme` |
| Español | `/es` | `/es/work/cortefilme` |

Internally every page lives under `app/[locale]`, and `proxy.ts` **rewrites**
unprefixed paths onto `/en`. That is deliberate: the apex keeps answering
`200` with real HTML instead of redirecting, so `curl`, crawlers and LLM
agents still get the content in one request. Only a reader arriving at `/`
whose browser asks for `pt` or `es` is redirected (`307`, never `301` — the
destination depends on the reader). Deep links are never hijacked.

Choosing a language sets a `NEXT_LOCALE` cookie (and mirrors it to
`localStorage`), and an explicit choice always beats browser detection. The
switcher is plain `<a>` links, so it works with JavaScript disabled and the
`hreflang` graph stays crawlable.

### Adding a language

1. Add it to `locales` and `localeMeta` in `lib/i18n.ts`.
2. Add a flag to `components/Flag.tsx`.
3. Copy `lib/content/en.ts` to `lib/content/<locale>.ts` and translate the
   strings. TypeScript fails the build until every key is present.
4. Register it in `byLocale` in `lib/content/index.ts`.

URLs, tech stacks and slugs live in `lib/content/shared.ts` and are shared by
every language — a translation cannot break a link or invent a stack.

## Layout

```
app/                 routes; page.tsx per route, all server components
  layout.tsx         fonts, metadataBase, global metadata
  page.tsx           home
  work/cortefilme/   case study
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx
components/          presentational only — no hardcoded copy, typed props
lib/i18n.ts          locales, detection, hreflang/canonical helpers
lib/content/         shared.ts (structure) + one file of strings per language
proxy.ts             language detection and apex rewrite (Next 16 middleware)
content/facts.md     every published claim mapped to its source (see "Truth")
lib/site.ts          canonical origin + identity — single source of truth
lib/schema.ts        JSON-LD builders
research/            how the content and the infra decisions were reached
deploy/              nginx server block
```

## Local development

The host runs Node 18, which Next 16 does not support (needs 20.9+).
Use nvm:

```bash
nvm use 22
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint
```

## Docker

```bash
docker compose build
docker compose up -d
curl -I http://127.0.0.1:3100
```

The container publishes **only on `127.0.0.1:3100`** — never on a public
interface. nginx on the host is the sole way in. `restart: unless-stopped`
means it comes back by itself after a reboot.

## Architecture

```
INTERNET → nginx :80/:443 (host)
             ├── cortefilme.com.br    → static files    (untouched)
             ├── sistema. / api.      → CorteFilme       (untouched)
             └── edsonboldrini.com.br → 127.0.0.1:3100 → this container
```

The CorteFilme `sistema` block is nginx's `default_server` and holds the
catch-all `server_name _`. This site's block therefore **must not** declare
`default_server` — see the comments in `deploy/nginx-edsonboldrini.conf`.

## DNS

At Registro.br, on `edsonboldrini.com.br`:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `167.235.246.150` | 3600 |
| A | `www` | `167.235.246.150` | 3600 |

`www` 301-redirects to the apex; the apex is the only canonical form.

## nginx + TLS

```bash
sudo cp deploy/nginx-edsonboldrini.conf /etc/nginx/sites-available/edsonboldrini
sudo ln -s /etc/nginx/sites-available/edsonboldrini /etc/nginx/sites-enabled/
sudo nginx -t                 # must pass before anything else
sudo systemctl reload nginx
curl -I https://cortefilme.com.br   # verify CorteFilme still answers
sudo certbot --nginx -d edsonboldrini.com.br -d www.edsonboldrini.com.br
```

The certificate is a **separate lineage** from CorteFilme's. CorteFilme's cert
covers four names in one file; re-issuing it to bolt this domain on would put
a live site at risk for no benefit. `certbot.timer` renews both.

## Deploying an update

```bash
git pull
docker compose build
docker compose up -d          # recreates only this container
curl -I https://edsonboldrini.com.br
```

Nothing here touches nginx or the CorteFilme containers.

## Editing content

All copy lives in **`lib/content.ts`**, typed. Components take props and
hardcode no text, so wording changes never require touching a component.

### Adding a project

1. Append an entry to `selectedWork` in `lib/content.ts` (`slug`, `title`,
   `role`, `oneLine`, `meta`, `stack`, `href`, `hasCaseStudy`).
2. For a full case study, set `hasCaseStudy: true`, add the study following
   the shape of `caseStudy`, and create `app/work/<slug>/page.tsx`.
3. Add the route to `app/sitemap.ts`.
4. Record the source of every new claim in `content/facts.md`.

## Truth

The site states nothing that isn't traceable to a source in
`research/person.md`. `content/facts.md` maps each published claim to its
source. Deliberately **absent**, because it could not be verified:
academic background, employment dates, business metrics for CorteFilme.
Deliberately absent because it is private: home address, phone, date of birth.

Two traps worth remembering, both documented in `research/person.md`:

- The `education`, `projects` and `volunteer` blocks in the old
  `edsonboldrini/resume` repo are unedited **JSON Resume template samples**
  ("University of Oklahoma", "Miss Direction", CoderDojo). They are not real.
- Most Flutter plugins on the GitHub account are **forks**, not authored work.
