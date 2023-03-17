# Build from other image
FROM node:15-alpine as BUILDER

ADD . /cv

WORKDIR /cv

ENV REACT_APP_TEST=test

RUN yarn install --frozen-lockfile && yarn run build

FROM nginx:1.15-alpine

# Copy site file
COPY --from=BUILDER /cv/build /usr/share/nginx/html
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod u+x /docker-entrypoint.sh

ENV TEST=test

CMD /docker-entrypoint.sh
