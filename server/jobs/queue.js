const { Queue } = require("bullmq");
const { EMBED_QUEUE } = require("./name");

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379, //redis default port
  password: process.env.REDIS_PASSWORD,
};

const embed = new Queue(EMBED_QUEUE, { connection });

module.exports = embed;
