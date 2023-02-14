require("dotenv").config();

const axios = require("axios");

const expo_url = process.env.EXPO_NOTIFICATIONS_URL;

const userModel = require("../models/userModel");

const capitaliseFirstLetter = require("./FirstLetterUpperCase");

const config = {
  headers: {
    Accept: "application/json",
    "Accept-encoding": "gzip, deflate",
    "Content-Type": "application/json",
  },
};

async function handleInterestNotification(
  userID,
  destination,
  interestedUserName
) {
  const user = await userModel.findById(userID);

  const notificationBody =
    interestedUserName +
    " is interested in your trip to " +
    capitaliseFirstLetter(destination);

  const message = {
    to: user.token,
    sound: "default",
    title: "Interest in your trip",
    body: notificationBody,
    data: { someData: "goes here" },
  };

  await axios.post(expo_url, message, config);
}

async function handleTripCreationNotification(token, destination) {
  const notificationBody =
    "Your trip to " + destination + " has been successfully added!";

  const message = {
    to: token,
    sound: "default",
    title: "Successfully Added Trip",
    body: notificationBody,
    data: { someData: "goes here" },
  };

  const retObj = await axios.post(expo_url, message, config);
  console.log(retObj);
}

module.exports = { handleInterestNotification, handleTripCreationNotification };
