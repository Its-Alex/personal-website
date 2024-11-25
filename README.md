# Personal website

This repository contains my personal website written in [`Svelte`](https://svelte.dev/)
using [SSR](https://en.wikipedia.org/wiki/Server-side_scripting).

## Requirements

- [mise](https://mise.jdx.dev/)

After having installed `mise` run:

```
$ mise plugin add pass https://github.com/Cybolic/asdf-pass.git
$ mise trust && mise install
```

Then install dependencies:

```bash
$ pnpm install
```

If you want to use real environment variables, and you have access run:

```bash
$ direnv allow
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
