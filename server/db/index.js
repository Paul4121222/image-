const mongoose = require("mongoose");
const url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";

let db = {
  bucket: null,
};

mongoose
  .connect(url)
  .then((res) => {
    console.log("connect to database");
    db.bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "images",
    });
  })
  .catch((e) => {
    console.log("fail connect", e);
  });

module.exports = db;
