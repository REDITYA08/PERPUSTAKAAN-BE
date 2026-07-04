const express = require("express");
const router = express.Router();

const genreController = require("../controllers/genreController");

router.get("/genres", genreController.getGenres);

router.post("/genres", genreController.createGenre);

router.put("/genres/:id", genreController.updateGenre);

router.delete("/genres/:id", genreController.deleteGenre);

module.exports = router;