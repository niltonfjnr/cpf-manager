FROM node:lts-slim AS development
ENV NODE_ENV=development
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]