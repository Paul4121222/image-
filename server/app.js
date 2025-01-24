const express = require("express");
require("./db");
const listRouter = require("./routers/list");

const app = express();
//所有/api請求都會被listRouter處理
app.use("/api", listRouter);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Server is listen:", port);
});
