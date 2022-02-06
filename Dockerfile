# build stage
FROM node:lts-slim as build

ENV NODE_ENV build

WORKDIR /app

# RUN apt update

COPY . /app

RUN chown -R node: /app
USER node

# RUN npm i -g @nestjs/cli@8.0.0
RUN npm i
RUN npm run build

# runtime stage
FROM node:lts-slim

ENV NODE_ENV develop

USER node
WORKDIR /app

COPY --from=build /app/dist /app
COPY --from=build /app/package.json /app
COPY --from=build /app/package-lock.lock /app
COPY --from=build /app/ormconfig.js /app

RUN npm i --prod

CMD ["node", "/app/src/main.js"]
