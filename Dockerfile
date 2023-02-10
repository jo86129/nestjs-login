# FROM node:14
FROM keymetrics/pm2:latest-alpine

COPY ./ ./
RUN npm i
RUN npm run build

ENTRYPOINT ["pm2-runtime", "start", "ecosystem.config.js"]