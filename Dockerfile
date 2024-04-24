FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn test

RUN yarn build

EXPOSE 8000

CMD ["sh", "-c", "yarn run migration:run && node ./dist/server.js"]