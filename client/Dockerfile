FROM node:bullseye-slim as next-build
WORKDIR /app
COPY ./package*.json .
COPY ./yarn.lock .
RUN corepack && corepack enable
RUN yarn
COPY . .
RUN yarn run build
EXPOSE 3000
ENV SERVER_URI=http://localhost:5000
ENV NODE_ENV=production
CMD ["yarn", "start"]
