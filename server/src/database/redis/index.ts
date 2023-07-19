import Redis from "ioredis";

interface RedisConfig {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  db?: number;
}

let _redis: Redis;

const connect = ({ host, port, username, password, db }: RedisConfig = {}) => {
  console.log("[REDIS] connecting to redis...");
  _redis = new Redis({
    host,
    port,
    username,
    password,
    db,
    retryStrategy: () => null,
  });

  return _redis;
};

export const redis = () => {
  if (!_redis) throw new Error("[REDIS] redis not connected!");

  return _redis;
};

export default connect;
