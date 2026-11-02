# Digests pin both images to Node 26.12.1; the tags alone float over patch releases.
FROM node:26.13.0-alpine@sha256:c6ad9e9c1d80f6eb607c26b4b0a132ff7a2344fad1c78ea3baa2a7d4c8de6d94 AS builder

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

FROM gcr.io/distroless/nodejs26-debian13:nonroot@sha256:9b945e92c1b5463a4b75f11e8417515e4bea7355f6adfd79ec220fbbe905dda8

ENV PORT=8000
EXPOSE 8000

WORKDIR /build

COPY --from=builder /app/build/ /build/
COPY --from=builder /app/package.json /build/

# distroless nodejs image has node as ENTRYPOINT, so CMD only needs the script
CMD ["/build/index.js"]
