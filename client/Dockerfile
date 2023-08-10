FROM node:bullseye-slim as next-build
WORKDIR /app
COPY ./package*.json .
COPY ./yarn.lock .
RUN corepack && corepack enable
RUN yarn
COPY . .
RUN yarn run build
EXPOSE 3000

CMD ["yarn", "start"]
