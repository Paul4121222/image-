const express = require("express");
const multer = require("multer");
const router = new express.Router();
const List = require("../models/list");

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
    const list = new List({ image: req.file.buffer });
    await list.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/list", async (req, res) => {
  const list = await List.find({});
  console.log(list);
  res.send([
    {
      segments: [
        {
          meta: {
            from: 0,
            num: 10,
            pageSize: 10,
          },
          count: 10,
          contents: [
            {
              id: "0Y4Tzn",
              uid: "p0Y4Tzn",
              type: "photo",
              lastUpdate: "2024-08-15 16:29:38",
              year: 2024,
              month: 8,
              day: 15,
              width: 608,
              height: 743,
              isScanned: true,
              scannedFlag: 1,
              thumb4k: false,
              duration: null,
              path: "6.jpg",
              ProjectionType: 0,
              dimension: "608 X 743",
              dateTime: "2024-08-15 09:19:27",
              prefix: "Multimedia/",
              index: 0,
              meta: {},
            },
            {
              id: "lucsEz",
              uid: "plucsEz",
              type: "photo",
              lastUpdate: "2024-08-15 16:29:38",
              year: 2024,
              month: 8,
              day: 15,
              width: 600,
              height: 900,
              isScanned: true,
              scannedFlag: 1,
              thumb4k: false,
              duration: null,
              path: "5.jpg",
              ProjectionType: 0,
              dimension: "600 X 900",
              dateTime: "2024-08-15 09:18:48",
              prefix: "Multimedia/",
              index: 1,
              meta: {},
            },
            {
              id: "IdjejN",
              uid: "pIdjejN",
              type: "photo",
              lastUpdate: "2024-08-15 15:50:53",
              year: 2024,
              month: 8,
              day: 2,
              width: 800,
              height: 1199,
              isScanned: true,
              scannedFlag: 1,
              thumb4k: false,
              duration: null,
              path: "2.jpg",
              ProjectionType: 0,
              dimension: "800 X 1199",
              dateTime: "2024-08-02 09:17:09",
              prefix: "Multimedia/",
              index: 2,
              meta: {},
            },
            {
              id: "uxSSbm",
              uid: "puxSSbm",
              type: "photo",
              lastUpdate: "2024-08-15 15:50:53",
              year: 2024,
              month: 8,
              day: 2,
              width: 1024,
              height: 1280,
              isScanned: true,
              scannedFlag: 1,
              thumb4k: false,
              duration: null,
              path: "3.jpeg",
              ProjectionType: 0,
              dimension: "1024 X 1280",
              dateTime: "2024-08-02 09:17:03",
              prefix: "Multimedia/",
              index: 3,
              meta: {},
            },
            {
              id: "XHBGUB",
              uid: "pXHBGUB",
              type: "photo",
              lastUpdate: "2024-08-15 16:29:37",
              year: 2024,
              month: 7,
              day: 31,
              width: 720,
              height: 890,
              isScanned: true,
              scannedFlag: 1,
              thumb4k: false,
              duration: null,
              path: "4.jpg",
              ProjectionType: 0,
              dimension: "720 X 890",
              dateTime: "2024-07-31 15:10:32",
              prefix: "Multimedia/",
              index: 4,
              meta: {},
            },
            {
              id: "J8zPTC",
              uid: "pJ8zPTC",
              type: "photo",
              lastUpdate: "2024-08-15 09:17:11",
              year: 2023,
              month: 4,
              day: 27,
              width: 2560,
              height: 1440,
              isScanned: true,
              scannedFlag: 1,
              thumb4k: false,
              duration: null,
              path: "1.jpg",
              ProjectionType: 0,
              dimension: "2560 X 1440",
              dateTime: "2023-04-27 10:08:57",
              prefix: "Multimedia/",
              index: 5,
              meta: {},
            },
            {
              id: "C8zPTC",
              uid: "pJ8zPTC",
              type: "photo",
              lastUpdate: "2024-08-15 09:17:11",
              year: 2023,
              month: 4,
              day: 27,
              width: 1280,
              height: 720,
              isScanned: true,
              scannedFlag: 1,
              thumb4k: false,
              duration: null,
              path: "7.jpg",
              ProjectionType: 0,
              dimension: "2560 X 1440",
              dateTime: "2023-04-27 10:08:57",
              prefix: "Multimedia/",
              index: 6,
              meta: {},
            },
            {
              id: "K8zPTC4",
              uid: "pJ8zPTC",
              type: "photo",
              lastUpdate: "2024-08-15 09:17:11",
              year: 2023,
              month: 4,
              day: 27,
              width: 1000,
              height: 667,
              isScanned: true,
              scannedFlag: 1,
              thumb4k: false,
              duration: null,
              path: "8.jpg",
              ProjectionType: 0,
              dimension: "2560 X 1440",
              dateTime: "2023-04-27 10:08:57",
              prefix: "Multimedia/",
              index: 7,
              meta: {},
            },
            {
              id: "B8zPTC",
              uid: "pJ8zPTC",
              type: "photo",
              lastUpdate: "2024-08-15 09:17:11",
              year: 2023,
              month: 4,
              day: 27,
              width: 720,
              height: 875,
              isScanned: true,
              scannedFlag: 1,
              thumb4k: false,
              duration: null,
              path: "9.jpg",
              ProjectionType: 0,
              dimension: "2560 X 1440",
              dateTime: "2023-04-27 10:08:57",
              prefix: "Multimedia/",
              index: 8,
              meta: {},
            },
          ],
          isGhost: false,
        },
      ],
      meta: {
        count: 10,
      },
    },
  ]);
});

module.exports = router;
