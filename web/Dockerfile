# stage 1 realiza build da aplicação
FROM node:21-alpine as build

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build


# stage 2 serve a aplicação buildada utilizando 
# um servidor http, neste caso o simples "serve"
FROM node:21-alpine

RUN npm i -g serve

WORKDIR /var/www/html
COPY --from=build /app/build .

ENTRYPOINT ["serve", "-s", ".", "-l", "80"]