FROM node:16-alpine as build
COPY ./package.json ./yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:16-alpine
RUN apk update && apk add curl
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache --production && yarn cache clean
COPY --from=build ./.next ./.next

EXPOSE 3000

CMD yarn start
