# Build from other image
FROM node:13-alpine as BUILDER

ADD . /cv

WORKDIR /cv

RUN npm install && npm run build

FROM nginx:1.15-alpine

# Copy site file
COPY --from=BUILDER /cv/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]