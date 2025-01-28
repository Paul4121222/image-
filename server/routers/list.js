const express = require("express");
const multer = require("multer");
const List = require("../models/list");
const Album = require("../models/album");
const sharp = require("sharp");
const { createProxyMiddleware } = require("http-proxy-middleware");

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

router.post("/list", upload.single("image"), async (req, res) => {
  try {
    const { width, height, format } = await sharp(req.file.buffer).metadata();
    const list = new List({
      image: req.file.buffer,
      width,
      height,
      format,
      name: req.file.originalname,
    });
    await list.save();
    res.send({ success: true });
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/list", async (req, res) => {
  const isDeleted = req.query.t === "remove";
  let query = { isDeleted };
  if (req.query.a) {
    const album = await Album.findById(req.query.a);
    query["_id"] = {
      $in: album?.images,
    };
  }
  const list = await List.find(query);
  res.send(list);
});

router.get("/list/:id", async (req, res) => {
  const image = await List.findById(req.params.id);
  res.set("Content-Type", `image/${image.format}`);
  res.send(image.image);
});

//從資料庫移除
// router.delete("/list", async (req, res) => {
//   try {
//     const list = await List.findByIdAndDelete(req.query.id);
//     console.log(req.query.id);
//     res.send(list);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

//批量移到垃圾桶
router.delete("/list", async (req, res) => {
  const { ids, t } = req.body;
  try {
    if (t === "remove") {
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
    } else if (t === "delete") {
      await List.deleteMany({
        _id: {
          $in: ids,
        },
      });
    } else {
      res.status(400).send();
      return;
    }
    res.send({ success: true });
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
