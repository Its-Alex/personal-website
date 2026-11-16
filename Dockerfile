# Digests pin both images to Node 26.12.1; the tags alone float over patch releases.
FROM node:26.13.1-alpine@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5 AS builder

WORKDIR /app

ADD src/ /app/src/
ADD static/ /app/static/
ADD .npmrc /app/
ADD package.json /app/
ADD pnpm-lock.yaml /app/
ADD pnpm-workspace.yaml /app/
ADD tsconfig.json /app/
ADD vite.config.ts /app/

RUN npm install -g pnpm@12.14.0 \
    && pnpm install --frozen-lockfile \
    && pnpm run build

FROM gcr.io/distroless/nodejs26-debian13:nonroot@sha256:33c86a63859efc2ebd88ea0a355863582ec6f1220d048de62baffb2584e709b3

ENV PORT=8000
EXPOSE 8000

WORKDIR /build

COPY --from=builder /app/build/ /build/
COPY --from=builder /app/package.json /build/

# distroless nodejs image has node as ENTRYPOINT, so CMD only needs the script
CMD ["/build/index.js"]
