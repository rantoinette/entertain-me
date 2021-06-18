const express = require("express");
const router = express();

const Controller = require("../controllers/series");

router.get("/series", Controller.showAllSeries);
router.post("/series", Controller.addSeries);
router.get("/series/:id", Controller.findOneSeries);
router.put("/series/:id", Controller.editSeries);
router.delete("/series/:id", Controller.deleteSeries);

module.exports = router;
