FROM node:bullseye-slim as server-build
WORKDIR /server
COPY ./package*.json .
COPY yarn.lock .
RUN yarn
RUN corepack && corepack enable
COPY . .

# ENV DATABASE_HOST=database
# ENV DATABASE_DIALECT=mariadb
# ENV DATABASE_PORT=3306
# ENV DATABASE_USER=amin
# ENV DATABASE_PASSWORD=aminzare
# ENV JWT_SECRET=%@%3OEvPWD6L3X5^%m4RjG&lbooYJbGAT
# ENV JWT_EXPIRE=600h
# ENV REDIS_HOST=redis
# ENV REDIS_PORT=6379
# ENV NODE_ENV=production

EXPOSE 5000
CMD ["yarn", "start"]