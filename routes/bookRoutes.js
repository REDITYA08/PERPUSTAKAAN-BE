const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const bookController = require("../controllers/bookController");

// Semua buku
router.get(
    "/books",
    bookController.getBooks
);

// Detail buku
router.get(
    "/books/:id",
    bookController.getBookById
);

// Tambah buku
router.post(
    "/books",
    upload,
    bookController.createBook
);

// Edit buku
router.put(
    "/books/:id",
    upload,
    bookController.updateBook
);

// Hapus buku
router.delete(
    "/books/:id",
    bookController.deleteBook
);

module.exports = router;