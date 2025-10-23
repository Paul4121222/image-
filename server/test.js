const embed = require("./jobs/queue");

(async () => {
    console.log('📤 嘗試新增一個任務到 Queue...');
    //job name / data / option: delay
    await embed.add('testJob1', {message: 'test'})
    await embed.add('testJob2', {message: 'test'})
    console.log('✅ 任務已加入 Queue，現在你可以建立 Worker 來處理它。');
    process.exit(0)
})()