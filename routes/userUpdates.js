const express = require("express");

const router = express.Router();

const userModel = require("../models/userModel");

router.get("/", async (req, res) => {
  console.log("Received Get");
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.send(500).json({ message: err.message });
  }
});

router.get("/:id", getUser, async (req, res) => {
  res.send(res.user);
});

router.post("/", async (req, res) => {
  if (req.body.userID === "" || req.body.token === "") {
    return res.status(400).json({ message: "Empty user ID or token" });
  }
  try {
    const userID = { _id: req.body.userID };
    const update = { userName: req.body.userName, token: req.body.token };
    const userCreated = await userModel.findOneAndUpdate(userID, update, {
      upsert: true,
      new: true,
    });
    console.log(userCreated);
    res.status(200).json(userCreated);
  } catch (err) {
    res.send(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await userModel.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
