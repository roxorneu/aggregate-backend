const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  userID: {
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
    type: String,
    required: true,
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

module.exports = mongoose.model("trip", tripSchema);
