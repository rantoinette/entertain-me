const express = require("express");
const PORT = 4001;
const app = express();
const { connect, getDatabase } = require("./config/mongodb");
const indexRouter = require("./routes/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
