# AGENTS.md

Personal website. SvelteKit 2 + Svelte 5 + Tailwind 4, SSR. Single package, no monorepo despite `pnpm-workspace.yaml`.

## Toolchain

- Node + pnpm versions are pinned by `.mise.toml` (`mise install` to match CI). `package.json#engines` allows `^20.19 || ^22.12 || >=24 || <26`; CI matrix tests Node 24/25/26 alpine.
- `pnpm` is required (`.npmrc` sets `engine-strict=true`, `packageManager: pnpm@11.5.0`). Do not introduce npm/yarn lockfiles.
- Secrets for local dev come from `pass` via `.envrc` (`direnv allow`). All runtime env vars are prefixed `PERSONAL_WEBSITE_MINIO_*`. Without them, the `/notes/*` route is disabled (redirects to `/`).

## Commands

| Task       | Command                                                                   |
| ---------- | ------------------------------------------------------------------------- |
| Dev server | `pnpm dev` (binds `0.0.0.0`, see `vite.config.ts`)                        |
| Typecheck  | `pnpm check` — runs `svelte-kit sync` first, required after route changes |
| Lint (CI)  | `pnpm lint` = `prettier --check .` + `eslint .`                           |
| Auto-fix   | `pnpm format`                                                             |
| Build      | `pnpm build`                                                              |

CI (`.github/workflows/main.yml`) runs `pnpm check` then `pnpm lint`. There are no tests in this repo — do not invent a test command.

**Every change must pass `pnpm check` and `pnpm lint` before being considered done.** Run `pnpm format` to auto-fix Prettier + ESLint issues; anything left over must be fixed manually. Do not commit code that fails either gate — CI will reject it.

Prettier rules (`.prettierrc`): no semicolons, single quotes, no tabs, `printWidth: 100`. ESLint uses flat config and reads `.gitignore` via `includeIgnoreFile`.

## Architecture quirks an agent will get wrong

- **Adapter is conditional** (`svelte.config.js`): `VERCEL` env → `@sveltejs/adapter-vercel`, otherwise `@sveltejs/adapter-node`. The Dockerfile uses the node build (`build/index.js`).
- **Tailwind 4** is wired through `@tailwindcss/vite` only — there is no `tailwind.config.js` and there must not be one. Theme/customization belongs in `src/app.css`.
- **mdsvex** treats `.md` as Svelte components (`extensions: ['.svelte', '.md']`). Code blocks are highlighted by a single Shiki highlighter (`src/lib/highlighter.ts`), preloaded in `hooks.server.ts#init`, theme `dracula`. Reuse `getHighlighter()` — don't create new highlighters.
- **Blog routing trick** (`src/routes/blog/[...slug]/+page.ts` and `+page.server.ts`): slashes in the URL slug map to underscores in the filename. `sub_sub.md` is served at `/blog/sub/sub`, `fr_why-use-git-correctly.md` at `/blog/fr/why-use-git-correctly`. When adding articles, name files accordingly and include full frontmatter (`title`, `description`, `publishDate`, `lastUpdateDate`, `published`) — articles missing any field or with `published: false` are silently dropped from the index.
- **Notes route** (`src/routes/notes/[...slug]/+page.server.ts`) fetches markdown from MinIO/S3 at request time and renders with `unified` + `remark` + `rehype` + Shiki. Only notes whose frontmatter has `public: true` are served; an optional `password` field requires `?password=...` in the URL. This is independent of the blog pipeline.
- **i18n** via `sveltekit-i18n` (`src/lib/translations/`). Root `/` redirects to `/{locale}/` (`src/routes/+page.server.ts`). Locale is resolved in `hooks.server.ts` from `?queryLanguage` → `lang` cookie → `Accept-Language`, then validated against `locales`. Currently `en`/`fr`. Adding a locale needs: a `locales/<code>.json`, a loader entry in `src/lib/translations/index.ts`, and a `src/routes/<code>/+page.svelte`.
- `src/app.d.ts` declares `App.Locals.locale` — keep it in sync if locale handling changes.

## Conventions

- **Never run `git commit`, `git push`, or any history-writing git command.** The repo owner commits manually; agents only stage/edit files unless the user explicitly says "commit it" (or equivalent) for that specific change.
- Match `.prettierrc` exactly (no semis, single quotes).
- TypeScript is strict (`noImplicitAny`, `strict`). Path aliases come from SvelteKit (`$lib`, `$types`); don't add to `tsconfig.json` directly (see comment in that file).
- Static assets in `static/` are served from `/`.

## Release

Pushes to `master` on `Its-Alex/personal-website` build and push `itsalex/personal-website:stable` via the `release` job. Dockerfile is multi-stage: `node:26.2-alpine` builder → `gcr.io/distroless/nodejs26-debian13:nonroot` runtime; `node` is the entrypoint, `CMD` is `/build/index.js`.
