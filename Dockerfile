# Build from other image
FROM node:15-alpine as BUILDER

ADD . /cv

WORKDIR /cv

ENV REACT_APP_CURRICULUM_POSTHOG_TOKEN=curriculum_posthog_token
ENV REACT_APP_CURRICULUM_POSTHOG_URL=http://posthog.local
ENV REACT_APP_CURRICULUM_SENTRY_DSN=sentry-dsn

RUN yarn install && yarn run build

FROM nginx:1.15-alpine

# Copy site file
COPY --from=BUILDER /cv/build /usr/share/nginx/html
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod u+x /docker-entrypoint.sh

ENV CURRICULUM_POSTHOG_TOKEN=curriculum_posthog_token
ENV CURRICULUM_POSTHOG_URL=http://posthog.local
ENV CURRICULUM_SENTRY_DSN=sentry-dsn

CMD /docker-entrypoint.sh
