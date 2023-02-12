const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },
  tokenCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("usertoken", userSchema);
