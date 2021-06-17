const express = require("express");
const PORT = 3000;
const app = express();
const { connect, getDatabase } = require("./config/mongodb");
const indexRouter = require("./routes/index");

app.get("/", (req, res) => {
  console.log("in");
  res.json({
    message: "Hello movie server",
  });
});

app.use(indexRouter);

connect()
  .then(() => {
    console.log("Connected");
    app.listen(PORT, (req, res) => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// app.use(indexRouter);
