FROM node:12-alpine
MAINTAINER Joosung Park <admin@slowmotion.dev>

COPY . /app
WORKDIR /app

RUN yarn && yarn build

CMD yarn start:prod
EXPOSE 8080
