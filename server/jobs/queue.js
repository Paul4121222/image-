const { Queue } = require("bullmq");
const { EMBED_QUEUE } = require("./name");
const Redis = require('ioredis')

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379, //redis default port
  password: process.env.REDIS_PASSWORD,
};

const embed = process.env.REDIS_URL ? new Queue(EMBED_QUEUE, {connection: new Redis(process.env.REDIS_URL,  { maxRetriesPerRequest: null })}) : new Queue(EMBED_QUEUE, { connection });

module.exports = embed;
