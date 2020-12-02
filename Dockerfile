FROM node:10.13-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

ENV NODE_ENV production

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node . .

USER root

RUN npm install pm2 -g

USER node

EXPOSE 3000

CMD npm run start-production