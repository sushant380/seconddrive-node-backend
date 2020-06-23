FROM node:alpine

WORKDIR /usr/src/app

RUN apk add npm

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY ./ ./

ARG MONGBO_DB_HOST
ENV MONGBO_DB_HOST=${MONGBO_DB_HOST}

EXPOSE 8000

CMD ["npm", "start"]