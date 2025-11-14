const express = require("express");
const multer = require("multer");
const List = require("../models/list");
const sharp = require("sharp");
const Album = require("../models/album");
const embed = require("../jobs/queue");
const db = require("../db");
const { Readable } = require("stream");
const mongoose = require("mongoose");

const router = new express.Router();

const upload = multer({
  fileFilter(req, file, cb) {
    if (/\.(png|jpeg|jpg)$/.test(file.originalname)) {
      cb(null, true);
      return;
    }

    cb(new Error("Please upload valid format"));
  },
});

router.post("/images", upload.single("image"), async (req, res) => {
  try {
    const { width, height, format } = await sharp(req.file.buffer).metadata();
    const uploadStream = db.bucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });
    const readableStream = Readable.from(req.file.buffer);
    readableStream.pipe(uploadStream);
    const list = new List({
      fileId: uploadStream.id, //儲存GridFs的file id
      width,
      height,
      format,
      name: req.file.originalname,
      mime: req.file.mimetype,
    });
    await list.save();

    await embed.add("photo", {
      photoID: list._id.toString(),
    });

    res.send({ success: true });
  } catch (e) {
    res.status(500).send();
  }
});

//得到照片牆
router.get("/images", async (req, res) => {
  let query = { isDeleted: false };
  if (req.query.a) {
    const album = await Album.findById(req.query.a);
    query["_id"] = {
      $in: album?.images,
    };
  }
  const list = await List.find(query);
  res.send(list);
});

router.get("/images/:id", async (req, res) => {
  const image = await List.findById(req.params.id);
  const fileId = image.fileId;

  //find  GridFs file
  const objectFileId = new mongoose.Types.ObjectId(fileId);
  //return cursor，指向結果的指標，檔案還在資料庫
  const cursor = db.bucket.find({ _id: objectFileId });
  //get all data
  const file = await cursor.toArray();
  if (!file.length) return res.status(404).send("File not found");

  //其實是readAbleStream
  const downloadStream = db.bucket.openDownloadStream(fileId);

  res.set("Content-Type", `image/${image.format}`);

  downloadStream.pipe(res);
});

router.delete("/images", async (req, res) => {
  const { ids } = req.body;
  try {
    await List.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
      {
        isDeleted: true,
      }
    );
    await Album.updateMany(
      {
        images: {
          $in: ids,
        },
      },
      {
        $pull: {
          images: {
            $in: ids,
          },
        },
      }
    );
    res.send({ success: true });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
