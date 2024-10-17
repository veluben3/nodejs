FROM node:alpine
WORKDIR /usr/src/veluben
COPY package.json .
RUN npm install
COPY . .
RUN tsc
CMD ["node", "./dist/src/index.js"]