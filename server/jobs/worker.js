const { EMBED_QUEUE } = require("./name");
const { Worker } = require("bullmq");
const List = require("../models/list");
const FormData = require("form-data");
const axios = require("axios");
const db = require("../db");
const Redis = require('ioredis')
const express = require('express');

const connection = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379, //redis default port
  password: process.env.REDIS_PASSWORD,
};

//return值會存回redis
const handleTask = async (job) => {
  const photo = await List.findById(job.data.photoID);
  if (!photo) throw new Error("找不到圖片");

  const formData = new FormData();
  const fileId = photo.fileId;
  const downloadStream = db.bucket.openDownloadStream(fileId);

  const option = {
    filename: photo.name,
    contentType: photo.mime,
  };

  formData.append("file", downloadStream, option);

  const mlUrl = process.env.ML_URL;
  if (!mlUrl) throw new Error("ML_URL 未設定，無法呼叫 FastAPI /embed");
  const res = await axios.post(mlUrl, formData, {
    headers: formData.getHeaders(),
  });

  await List.findByIdAndUpdate(job.data.photoID, {
    embedStatus: "done",
    embed: res.data.embedding,
    keyLabel: res.data.label,
  });

  return { result: "done" };
};

//要處理的queue / process task
const worker = new Worker(EMBED_QUEUE, handleTask, process.env.REDIS_URL ? {connection: new Redis(process.env.REDIS_URL,  { maxRetriesPerRequest: null }) }: { connection });

worker.on("failed", (job, err) => {
  console.error("❌ 任務失敗：", job?.id, err?.message);
});

worker.on("completed", (job) => {
  console.log("🎉 任務完成：", job.id);
});


// ---- Dummy HTTP server 供 Render 掃 port ----
const app = express();
app.get('/healthz', (_, res) => res.send('ok'));
const PORT = process.env.PORT || 10000;   // Render 預設 $PORT=10000
app.listen(PORT, '0.0.0.0', () => console.log('dummy server on', PORT));