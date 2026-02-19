const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("Mongo Error:", err));

// Schema
const aosSchema = new mongoose.Schema({
  data: Object
});

const AOS = mongoose.model("AOS", aosSchema);

// Routes
app.get("/", (req, res) => {
  res.send("AOS Backend + MongoDB Live 🚀");
});

app.post("/api/save", async (req, res) => {
  await AOS.deleteMany({});
  await AOS.create({ data: req.body });
  res.json({ message: "Saved to DB" });
});

app.get("/api/load", async (req, res) => {
  const saved = await AOS.findOne();
  res.json(saved ? saved.data : {});
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
