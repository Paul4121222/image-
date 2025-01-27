const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

schema.virtual("count").get(function () {
  return this.images.length;
});

const Album = mongoose.model("Album", schema);

module.exports = Album;
