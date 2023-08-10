# Chat application

This is an example application chat that is created with socket-io and nodejs

### Installation

- Install mariadb
- Install redis
- Install nodejs
- Install yarn
### Clone

- git clone https://github.com/aminxare/chat-app.git

### Run in production
- cd server && yarn
- cd client && yarn
- cd chat-backend && yarn

### Run in development

for run in dev mod you can run this command to run all servers.

```bash
    cd server && yarn dev
    cd client && yarn dev
```

### Run in production

for run in production mod you can run this command to run all servers.
edit .env file in server folder and set your redis and mariadb connection.
edit .env file in client folder.

```bash
  cd client && yarn run build && yarn start
  cd server && yarn start
```

### Run in production with docker
for run in production mod you can run this command to run all servers.

```bash
  cd server && docker-compose up
```