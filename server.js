require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE_PATH);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));

app.use(express.json());

const tripsRouter = require("./routes/tripUpdates");

app.use("/tripUpdates", tripsRouter);

app.listen(3000, () => console.log("Server started"));
