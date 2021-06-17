const express = require("express");
const router = express();

const Controller = require("../controllers/movies");

router.get("/movies", Controller.showAllMovie);
router.get("/movies/:id", Controller.findOneMovie);
router.post("/movies", Controller.addMovie);
router.put("/movies/:id", Controller.editMovie);
router.delete("/movies/:id", Controller.deleteMovie);

module.exports = router;
