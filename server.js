const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let aosData = {};

app.get("/", (req, res) => {
  res.send("AOS Backend Live 🚀");
});

app.post("/api/save", (req, res) => {
  aosData = req.body;
  res.json({ message: "Data saved successfully" });
});

app.get("/api/load", (req, res) => {
  res.json(aosData);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
