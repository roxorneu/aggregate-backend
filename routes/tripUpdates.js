const express = require("express");

const router = express.Router();

const tripsModel = require("../models/tripModel");

router.get("/", async (req, res) => {
  try {
    const trips = await tripsModel.find();
    res.json(trips);
  } catch (err) {
    res.send(500).json({ message: err.message });
  }
});

router.get("/:id", (req, res) => {});

router.post("/", async (req, res) => {
  const newTrip = new tripsModel({
    _id: req.body.tripID,
    userID: req.body.userID,
    userName: req.body.userName,
    destination: req.body.destination,
    coTravellers: req.body.coTravellers,
    interestedUsers: req.body.interestedUsers,
  });

  try {
    const newTripAdded = await newTrip.save();
    res.status(201).json(newTripAdded);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
