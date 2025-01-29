const express = require("express");
const List = require("../models/list");
const Album = require("../models/album");

const router = new express.Router();

//get trash list
router.get("/list", async (req, res) => {
  try {
    const list = await List.find({ isDeleted: true });
    res.send(list);
  } catch (e) {
    res.status(500).send();
  }
});

//批量移到垃圾桶
router.delete("/list", async (req, res) => {
  const { ids } = req.body;
  try {
    await List.deleteMany({
      _id: {
        $in: ids,
      },
    });
    res.send({ success: true });
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
