# Build from other image
FROM node:20.11.1-alpine as BUILDER

WORKDIR /app

ADD src/ /app/src/
ADD static/ /app/src/
ADD .npmrc /app/
ADD package.json /app/
ADD pnpm-lock.yaml /app/
ADD postcss.config.js /app/
ADD svelte.config.js /app/
ADD tailwind.config.js /app/
ADD tsconfig.json /app/
ADD vite.config.ts /app/

RUN corepack enable \
    && corepack prepare pnpm@8.15.4 --activate \
    && pnpm install --frozen-lockfile \
    && pnpm run build

FROM node:20-alpine

ENV PORT=80
EXPOSE 80

COPY --from=BUILDER /app/build/ /build/
COPY --from=BUILDER /app/package.json /build/

CMD ["node", "/build/index.js"]
