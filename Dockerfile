# Build from other image
FROM node:24.4.1-alpine AS builder

WORKDIR /app

ADD src/ /app/src/
ADD static/ /app/static/
ADD .npmrc /app/
ADD package.json /app/
ADD pnpm-lock.yaml /app/
ADD svelte.config.js /app/
ADD tsconfig.json /app/
ADD vite.config.ts /app/

RUN corepack enable \
    && corepack prepare pnpm@9.12.1 --activate \
    && pnpm install --frozen-lockfile \
    && pnpm run build

FROM node:22-alpine

ENV PORT=80
EXPOSE 80

COPY --from=builder /app/build/ /build/
COPY --from=builder /app/package.json /build/

CMD ["node", "/build/index.js"]
