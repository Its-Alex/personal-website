# Digests pin both images to Node 26.12.1; the tags alone float over patch releases.
FROM node:26.12.1-alpine@sha256:40cd011b55415bc894e45b02fdd5a5dfde056921b7d23a64c74f80497af48797 AS builder

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

FROM gcr.io/distroless/nodejs26-debian13:nonroot@sha256:96455baef11b178fc135b32206e3922c515dbed2400676c94f907f8f84e6abf6

ENV PORT=8000
EXPOSE 8000

WORKDIR /build

COPY --from=builder /app/build/ /build/
COPY --from=builder /app/package.json /build/

# distroless nodejs image has node as ENTRYPOINT, so CMD only needs the script
CMD ["/build/index.js"]
