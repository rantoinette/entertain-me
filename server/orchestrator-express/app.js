const express = require("express");
const app = express();
const port = 4000;
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const movies = require("./routes/movies");
const series = require("./routes/series");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "server running successfully" });
});

app.use(movies);

app.listen(port, () => {
  console.log(`orchestrator running on port: ${port}`);
});
