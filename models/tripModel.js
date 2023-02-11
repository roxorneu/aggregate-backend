const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  coTravellers: {
    type: Number,
    required: false,
    default: 0,
  },
  interestCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  interestedUsers: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("userinterestbytrip", tripSchema);
