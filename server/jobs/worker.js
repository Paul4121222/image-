const { EMBED_QUEUE } = require('./name');
const { Worker } = require('bullmq');

const connection = {
    host: '127.0.0.1',
    port: 6379, //redis default port
}

//return值會存回redis
const handleTask = async (job) => {
    console.log('🧠 處理任務中...', job.name, job.data);
    await new Promise(resolve => setTimeout(resolve, 2000)); // 模擬耗時
    
    return {result: 'done'}
}

//要處理的queue / process task
const worker = new Worker(EMBED_QUEUE, handleTask, { connection});

worker.on('fail', (job) => {
    console.error('❌ 任務失敗：', job.id, err);
})

worker.on('completed', job => {
  console.log('🎉 任務完成：', job.id);
});
