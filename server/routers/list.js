const express = require("express");
const multer = require("multer");
const router = new express.Router();
const List = require("../models/list");
const sharp = require("sharp");
const { createProxyMiddleware } = require("http-proxy-middleware");

const upload = multer({
  fileFilter(req, file, cb) {
    if (/\.(png|jpeg|jpg)$/.test(file.originalname)) {
      cb(null, true);
      return;
    }

    cb(new Error("Please upload valid format"));
  },
});

router.post("/list", upload.single("image"), async (req, res) => {
  try {
    const { width, height, format } = await sharp(req.file.buffer).metadata();
    const list = new List({ image: req.file.buffer, width, height, format });
    await list.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/list", async (req, res) => {
  console.log("find");
  const list = await List.find({});
  res.send(list);
});

router.get("/list/:id", async (req, res) => {
  const image = await List.findById(req.params.id);
  res.set("Content-Type", `image/${image.format}`);
  res.send(image.image);
});

module.exports = router;
