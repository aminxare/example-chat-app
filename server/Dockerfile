FROM node:bullseye-slim as server-build
WORKDIR /server
COPY ./package*.json .
COPY yarn.lock .
RUN yarn
RUN corepack && corepack enable
COPY . .
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV DATABASE_DIALECT=mariadb
ENV DATABASE=test
ENV DATABASE_USERNAME=amin
ENV DATABASE_PASSWORD=aminzare
EXPOSE 5000
CMD ["yarn", "start"]