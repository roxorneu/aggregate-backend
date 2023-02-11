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

// Post updates the trip if it exists and creates one if it doesn't

router.post("/", async (req, res) => {
  let trip;
  try {
    trip = await tripsModel.findById(req.body.tripID);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  if (trip == null) {
    const newTrip = new tripsModel({
      _id: req.body.tripID,
      coTravellers: 1,
      userName: req.body.userName,
      destination: req.body.destination,
      interestedUsers: req.body.interestedUsers,
    });
    try {
      const newTripAdded = await newTrip.save();
      res.status(201).json(newTripAdded);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    var newInterestedUser = req.body.interestedUsers;
    if (newInterestedUser != null) {
      if (!trip.interestedUsers.includes(newInterestedUser)) {
        trip.interestedUsers = trip.interestedUsers.concat(newInterestedUser);
        trip.coTravellers = trip.coTravellers + 1;
      }
    }
    try {
      await trip.save();
      res.send(trip);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

router.get("/:id", getTrip, async (req, res) => {
  res.send(res.trip);
});

router.patch("/:id", getTrip, async (req, res) => {
  var newInterestedUser = req.body.interestedUsers;
  if (newInterestedUser != null) {
    if (!res.trip.interestedUsers.includes(newInterestedUser)) {
      res.trip.interestedUsers =
        res.trip.interestedUsers.concat(newInterestedUser);
      res.trip.coTravellers = res.trip.coTravellers + 1;
    }
  }
  try {
    await res.trip.save();
    res.send(res.trip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getTrip, async (req, res) => {
  try {
    await res.trip.remove();
    res.json({ message: "Deleted trip" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

async function getTrip(req, res, next) {
  let trip;
  try {
    trip = await tripsModel.findById(req.params.id);
    if (trip == null) {
      return res.status(404).json({ message: "Trip Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.trip = trip;
  next();
}

module.exports = router;
