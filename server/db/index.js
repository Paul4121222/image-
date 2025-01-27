const mongoose = require("mongoose");
console.log(process.env.MONGODB_URL);
mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => {
    console.log("connect to database");
  })
  .catch((e) => {
    console.log("fail connect", e);
  });
