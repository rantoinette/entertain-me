const express = require("express");
const router = express.Router();

const movieRouter = require("./movies");

router.use(movieRouter);

module.exports = router;
