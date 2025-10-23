const { Queue } = require('bullmq');
const { EMBED_QUEUE } = require('./name');

const connection = {
    host: '127.0.0.1',
    port: 6379, //redis default port
}

const embed = new Queue(EMBED_QUEUE, connection);

module.exports = embed;
