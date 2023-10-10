FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env ./

RUN npm ci

COPY . .

EXPOSE 3000

RUN apk update && \
    apk add -q openssl && \
    openssl req -newkey rsa:4096 -new -nodes -x509 -days 3650 -keyout ./src/https-server/certifications/key.pem -out ./src/https-server/certifications/cert.pem \
    -subj "/C=FR/ST=PACA/L=Marseille/O=Digitech/CN=example.com"

ENV DATABASE_URL "mysql://root:user@localhost:3306/restaurant"

RUN npx prisma generate --schema src/express-web-api/prisma/schema.prisma

CMD npm run deploy
