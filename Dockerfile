# Build from other image
FROM node:18-alpine as BUILDER

ADD . /cv

WORKDIR /cv

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" PNPM_VERSION=8.9.0 sh - && \
    source /root/.shrc && \
    pnpm install --frozen-lockfile && pnpm run build

FROM node:18-alpine

ENV PORT=80

COPY --from=BUILDER /cv/build/ /build/
COPY --from=BUILDER /cv/package.json /build/

CMD ["node", "/build/index.js"]
