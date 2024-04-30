// express-server/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/counter_db";

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define counter schema and model
const counterSchema = new mongoose.Schema(
  {
    count: { type: Number, default: 0 },
    Mycount: { type: Number, default: 0 },
  },
  { collection: "counters" }
);
const Counter = mongoose.model("Counter", counterSchema);

// Routes
app.get("/api/counter", async (req, res) => {
  console.log("Reached GET method");
  try {
    const counter = await Counter.findOne();
    console.log(counter);
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/counter/increment", async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.count++;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/counter/decrement", async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.count--;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// my counter

app.get("/api/Mycounter", async (req, res) => {
  console.log("Reached GET method");
  try {
    const counter = await Counter.findOne();
    console.log(counter);
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/Mycounter/increment", async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.Mycount++;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/Mycounter/decrement", async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.Mycount--;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
