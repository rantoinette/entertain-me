const express = require("express");
const router = express.Router();
const tvSeriesRouter = require("./tvSeries");

router.use(tvSeriesRouter);

module.exports = router;
