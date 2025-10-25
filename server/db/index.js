const mongoose = require("mongoose");
const url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";

mongoose
  .connect(url)
  .then((res) => {
    console.log("connect to database");
  })
  .catch((e) => {
    console.log("fail connect", e);
  });
