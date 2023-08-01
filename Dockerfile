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
ENV SERVER_URI=http://server:5000
CMD ["yarn", "start"]

#server
FROM node:bullseye-slim as server-build
WORKDIR /server
COPY ./server/package*.json .
COPY ./server/yarn.lock .
RUN yarn
RUN corepack && corepack enable
COPY ./server/* .
EXPOSE 5000
CMD ["yarn", "start"]