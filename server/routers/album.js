const express = require("express");
const Album = require("../models/album");

const router = new express.Router();

router.post("/album", async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.send({ success: true });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/album", async (req, res) => {
  const albums = await Album.find({});
  const type = req.query.t;
  if (type === "totalAlbums") {
    res.send({ DataCount: albums.length });
  } else if (type === "allAlbums") {
    res.send({ result: albums });
  }
});
module.exports = router;
