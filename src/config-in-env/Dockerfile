FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./tsconfig.json ./tsconfig.build.json ./
COPY ./src ./src
COPY ./app.env ./
RUN yarn install
RUN npm i -g nodemon 

ENTRYPOINT [ "nodemon", "--exec", "ts-node", "./src/index.ts" ]
