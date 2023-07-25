const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const devSchema = new Schema({
  id: {
    type: Number,
    required: true,
    default: 0,
  },
  message: {
    type: String,
    required: true,
  },
});

const dev = mongoose.model("dev", devSchema);

module.exports = dev;
