const db = require("../config/db");

// Ambil komentar berdasarkan buku
exports.getComments = (req, res) => {

    const { bookId } = req.params;

    const sql = `
        SELECT
            comments.id,
            comments.komentar,
            comments.created_at,
            users.name
        FROM comments
        JOIN users
            ON comments.user_id = users.id
        WHERE comments.book_id = ?
        ORDER BY comments.created_at DESC
    `;

    db.query(sql, [bookId], (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result);

    });

};

// Tambah komentar
exports.addComment = (req, res) => {

    const { user_id, book_id, komentar } = req.body;

    const sql = `
        INSERT INTO comments
        (user_id, book_id, komentar)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [user_id, book_id, komentar], (err) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json({
            message: "Komentar berhasil ditambahkan"
        });

    });

};

// Hapus komentar
exports.deleteComment = (req, res) => {

    db.query(

        "DELETE FROM comments WHERE id=?",

        [req.params.id],

        (err) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({
                message: "Komentar berhasil dihapus"
            });

        }

    );

};