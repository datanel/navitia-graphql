FROM node:8.4.0-alpine as client
LABEL maintainer="David Quintanel david.quintanel@gmail.com"
WORKDIR /app
COPY client client
WORKDIR client
RUN yarn install && yarn build

FROM node:8.4.0-alpine
WORKDIR /app/client
COPY --from=client /app/client/build build
WORKDIR /app
ADD package.json .
RUN yarn install --production && yarn global add pm2 && yarn cache clean --force
COPY . .
EXPOSE 3000
USER node
CMD ["pm2", "start", "processes.json", "--no-daemon"]
