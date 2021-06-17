const express = require("express");
const router = express.Router();

const movieRouter = require("./movies");
const seriesRouter = require("./tvSeries");

router.use(movieRouter);
router.use(seriesRouter);

module.exports = router;
