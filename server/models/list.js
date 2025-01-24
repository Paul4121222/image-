const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: Buffer,
  },
});
const List = mongoose.model("List", schema);
module.exports = List;
