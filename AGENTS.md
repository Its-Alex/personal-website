# AGENTS.md

Personal website. SvelteKit 3 + Svelte 5 + Tailwind 4, SSR. Single package, no monorepo despite `pnpm-workspace.yaml`.

## Toolchain

- Node + pnpm versions are pinned by `.mise.toml` (`mise install` to match CI). `package.json#engines` requires `>=22.17` (SvelteKit 3); CI matrix tests Node 24/25/26 alpine.
- `pnpm` is required (`.npmrc` sets `engine-strict=true`, `packageManager: pnpm@11.5.0`). Do not introduce npm/yarn lockfiles.
- Secrets for local dev come from `gopass` via `.envrc` (`direnv allow`). The repository ships its own age-backed gopass store in `passwords/`, selected through the `GOPASS_CONFIG_*` variables in `.mise.toml`. All runtime env vars are prefixed `PERSONAL_WEBSITE_MINIO_*`. Without them, the `/notes/*` route is disabled (redirects to `/`).

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

- **Config lives in `vite.config.ts`** (SvelteKit 3 dropped `svelte.config.js`; do not recreate it): `sveltekit({...})` options, mdsvex preprocessing and the adapter. `$lib` no longer exists — use `#lib/...` with the file extension (`package.json#imports`).
- **Adapter is conditional** (`vite.config.ts`): `VERCEL` env → `@sveltejs/adapter-vercel`, otherwise `@sveltejs/adapter-node`. The Dockerfile uses the node build (`build/index.js`).
- **Tailwind 4** is wired through `@tailwindcss/vite` only — there is no `tailwind.config.js` and there must not be one. Theme/customization belongs in `src/app.css`.
- **mdsvex** treats `.md` as Svelte components (`extensions: ['.svelte', '.md']`). Code blocks are highlighted by a single Shiki highlighter (`src/lib/highlighter.ts`), preloaded in `hooks.server.ts#init`, theme `dracula`. Reuse `getHighlighter()` — don't create new highlighters.
- **Blog routing trick** (`src/routes/blog/[...slug]/+page.ts` and `+page.server.ts`): slashes in the URL slug map to underscores in the filename. `sub_sub.md` is served at `/blog/sub/sub`, `fr_why-use-git-correctly.md` at `/blog/fr/why-use-git-correctly`. When adding articles, name files accordingly and include full frontmatter (`title`, `description`, `publishDate`, `lastUpdateDate`, `published`) — articles missing any field or with `published: false` are silently dropped from the index.
- **Notes route** (`src/routes/notes/[...slug]/+page.server.ts`) fetches markdown from MinIO/S3 at request time and renders with `unified` + `remark` + `rehype` + Shiki. Only notes whose frontmatter has `public: true` are served; an optional `password` field requires `?password=...` in the URL. This is independent of the blog pipeline.
- **i18n** via `sveltekit-i18n` v3 (`src/lib/translations/index.ts`, built with `defineI18n` from `sveltekit-i18n/kit`). `handle` is re-exported in `hooks.server.ts`, `load` in the root `+layout.server.ts` and `+layout.ts`, and `use(() => data)` is called in the root `+layout.svelte`. Components call `const i18n = get()` then `i18n.t(...)` / `i18n.locale` — never destructure reactive properties. The locale is negotiated per request: `?queryLanguage` → `lang` cookie → `Accept-Language` → `initLocale` (`en`). `<html lang dir>` is filled from `%lang%`/`%dir%` in `app.html`. Root `/` redirects to `/{locale}/` (`src/routes/+page.server.ts`). Currently `en`/`fr`. Adding a locale needs: a `locales/<code>.json`, the code added to the loader's `locale` list in `src/lib/translations/index.ts`, and a `src/routes/<code>/+page.svelte`.

## Conventions

- **Never run `git commit`, `git push`, or any history-writing git command.** The repo owner commits manually; agents only stage/edit files unless the user explicitly says "commit it" (or equivalent) for that specific change.
- Match `.prettierrc` exactly (no semis, single quotes).
- TypeScript is strict (`noImplicitAny`, `strict`). Path aliases: `#lib` comes from `package.json#imports`, `$types`/`$app/*` from SvelteKit; do not add `paths` to `tsconfig.json`.
- Static assets in `static/` are served from `/`.

## Release

Pushes to `master` on `Its-Alex/personal-website` build and push `itsalex/personal-website:stable` via the `release` job. Dockerfile is multi-stage: `node:26.2-alpine` builder → `gcr.io/distroless/nodejs26-debian13:nonroot` runtime; `node` is the entrypoint, `CMD` is `/build/index.js`.
