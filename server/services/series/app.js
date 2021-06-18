const express = require("express");
const PORT = 4002;
const app = express();
const { connect, getDatabase } = require("./config/mongodb");
const indexRouter = require("./routes/index");

app.get("/", (req, res) => {
  console.log("in");
  res.json({
    message: "Hello series server",
  });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
