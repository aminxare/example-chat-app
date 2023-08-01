#server
FROM node:bullseye-slim as server-build
WORKDIR /server
RUN apt update
RUN apt install -y mariadb redis
RUN systemctl start mariadb redis
COPY ./server/package*.json .
COPY ./server/yarn.lock .
RUN yarn
RUN corepack && corepack enable
COPY . .

ENV DATABASE_HOST=database
ENV DATABASE_DIALECT=mariadb
ENV DATABASE_PORT=3306
ENV DATABASE_USER=amin
ENV DATABASE_PASSWORD=aminzare
ENV JWT_SECRET=%@%3OEvPWD6L3X5^%m4RjG&lbooYJbGAT
ENV JWT_EXPIRE=600h
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV PORT=5000

CMD ["yarn", "start"]

# client
FROM node:bullseye-slim as next-build
WORKDIR /app
COPY ./client/package*.json .
COPY ./client/yarn.lock .
RUN corepack && corepack enable
RUN yarn
COPY ./client/ .
RUN yarn run build
EXPOSE 3000
ENV SERVER_URI=http://host.docker.internal:5000
CMD ["yarn", "start"]