# Build from other image
FROM node:20-alpine as BUILDER

ADD . /cv

WORKDIR /cv

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" PNPM_VERSION=8.4.0 sh - && \
    source /root/.shrc && \
    pnpm install --frozen-lockfile && pnpm run build

COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod u+x /docker-entrypoint.sh

CMD /docker-entrypoint.sh
