# Personal website

This repository contains my personal website written in [`Svelte`](https://svelte.dev/)
using [SSR](https://en.wikipedia.org/wiki/Server-side_scripting).

## Requirements

- [mise](https://mise.jdx.dev/)

After having installed `mise` run:

```
$ mise install
```

Then install dependencies:

```bash
$ pnpm install
```

## Developing

To start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.
