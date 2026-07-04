const db = require("../config/db");

// ==========================
// GET Semua Genre
// ==========================
exports.getGenres = (req, res) => {
  db.query("SELECT * FROM genres ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// ==========================
// Tambah Genre
// ==========================
exports.createGenre = (req, res) => {
  const { nama_genre } = req.body;

  if (!nama_genre) {
    return res.status(400).json({
      success: false,
      message: "Nama genre wajib diisi",
    });
  }

  db.query(
    "INSERT INTO genres (nama_genre) VALUES (?)",
    [nama_genre],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Genre berhasil ditambahkan",
      });
    }
  );
};

// ==========================
// Update Genre
// ==========================
exports.updateGenre = (req, res) => {
  const { id } = req.params;
  const { nama_genre } = req.body;

  db.query(
    "UPDATE genres SET nama_genre=? WHERE id=?",
    [nama_genre, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Genre berhasil diupdate",
      });
    }
  );
};

// ==========================
// Hapus Genre
// ==========================
exports.deleteGenre = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM genres WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      message: "Genre berhasil dihapus",
    });
  });
};