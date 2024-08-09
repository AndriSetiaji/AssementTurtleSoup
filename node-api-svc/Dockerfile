FROM node:alpine
WORKDIR /usr/node-api-svc
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "./dist/server.js"]
