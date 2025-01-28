const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  format: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
});
const List = mongoose.model("List", schema);
module.exports = List;
