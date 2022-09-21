const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  linkImage: {
    type: String,
    require: true,
  },
  linkMusic: {
    type: String,
    require: true,
  },
});
//epalido de 'musicSchema' para 'music
module.exports = mongoose.model("Music", musicSchema);
