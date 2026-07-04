const db = require("../config/db");

// Tambah Favorite
exports.addFavorite = (req, res) => {

    const { user_id, book_id } = req.body;

    db.query(

        "SELECT * FROM favorites WHERE user_id=? AND book_id=?",

        [user_id, book_id],

        (err, result) => {

            if (err) return res.status(500).json(err);

            // Sudah favorite -> hapus
            if (result.length > 0) {

                db.query(

                    "DELETE FROM favorites WHERE user_id=? AND book_id=?",

                    [user_id, book_id],

                    (err2) => {

                        if (err2) return res.status(500).json(err2);

                        return res.json({

                            success: true,

                            favorite: false,

                            message: "Favorite dihapus"

                        });

                    }

                );

            }

            // Belum favorite -> tambah
            else {

                db.query(

                    "INSERT INTO favorites(user_id,book_id) VALUES(?,?)",

                    [user_id, book_id],

                    (err2) => {

                        if (err2) return res.status(500).json(err2);

                        return res.json({

                            success: true,

                            favorite: true,

                            message: "Favorite ditambahkan"

                        });

                    }

                );

            }

        }

    );

};

// Ambil Favorite User
exports.getFavorites = (req, res) => {

    db.query(

        `
        SELECT
            favorites.id,
            books.*
        FROM favorites
        JOIN books
        ON favorites.book_id = books.id
        WHERE favorites.user_id = ?
        `,

        [req.params.userId],

        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result);

        }

    );

};
// Cek apakah buku sudah difavoritkan user
exports.checkFavorite = (req, res) => {

    const { userId, bookId } = req.params

    db.query(

        "SELECT * FROM favorites WHERE user_id=? AND book_id=?",

        [userId, bookId],

        (err, result) => {

            if (err) return res.status(500).json(err)

            res.json({
                favorite: result.length > 0
            })

        }

    )

}
// Hapus Favorite
exports.deleteFavorite = (req, res) => {

    db.query(

        "DELETE FROM favorites WHERE id=?",

        [req.params.id],

        (err) => {

            if (err) return res.status(500).json(err);

            res.json({
                success: true
            });

        }

    );

};