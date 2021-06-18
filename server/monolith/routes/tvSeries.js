const express = require("express");
const router = express();

const Controller = require("../controllers/tvSeries");

router.get("/series", Controller.showAllSeries);
router.get("/series/:id", Controller.findOneSeries);
router.post("/series", Controller.addSeries);
router.put("/series/:id", Controller.editSeries);
router.delete("/series/:id", Controller.deleteSeries);

module.exports = router;
