const express = require("express");
const path = require("path");

require("./db");
const listRouter = require("./routers/list");
const albumRouter = require("./routers/album");

const app = express();

app.use(express.json());
//所有/api請求都會被listRouter處理
app.use("/api", listRouter);
app.use("/api", albumRouter);
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
  console.log(88);
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Server is listen:", port);
});
