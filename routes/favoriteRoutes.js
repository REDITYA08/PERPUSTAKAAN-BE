const express = require("express");

const router = express.Router();

const favoriteController = require("../controllers/favoriteController");

// Tambah
router.post(
    "/favorites",
    favoriteController.addFavorite
);

// Ambil Favorite User
router.get(
    "/favorites/:userId",
    favoriteController.getFavorites
);
router.get(
    "/favorites/:userId/:bookId",
    favoriteController.checkFavorite
);
// Hapus
router.delete(
    "/favorites/:id",
    favoriteController.deleteFavorite
);

module.exports = router;