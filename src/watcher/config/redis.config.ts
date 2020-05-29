import config from 'config';
const redisConfig = config.redis;

const host = process.env.REDIS_HOST || redisConfig.host;
const port = parseInt(process.env.REDIS_PORT, 10) || redisConfig.port;

export const redisClientConfig = {
    port: port,
    host: host
};