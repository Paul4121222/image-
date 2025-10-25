const express = require("express");
const multer = require("multer");
const List = require("../models/list");
const sharp = require("sharp");
const Album = require("../models/album");
const embed = require('../jobs/queue')

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
    const list = new List({
      image: req.file.buffer,
      width,
      height,
      format,
      name: req.file.originalname,
      mime: req.file.mimetype,
    });
    await list.save();

    await embed.add('photo', {
      photoID: list._id.toString()
    })

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
  res.set("Content-Type", `image/${image.format}`);
  res.send(image.image);
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
