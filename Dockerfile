FROM node:8.4.0-alpine
MAINTAINER David Quintanel david.quintanel@gmail.com
WORKDIR /app
ADD package.json .
RUN yarn install --production && yarn global add pm2 && yarn cache clean --force
COPY . .
EXPOSE 3000
USER node
CMD ["pm2", "start", "processes.json", "--no-daemon"]
