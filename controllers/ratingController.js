const db = require("../config/db");

// Tambah / Update Rating
exports.addRating = (req, res) => {

    const { user_id, book_id, rating } = req.body;

    const checkSql =
        "SELECT * FROM ratings WHERE user_id=? AND book_id=?";

    db.query(checkSql, [user_id, book_id], (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        if (result.length > 0) {

            db.query(

                "UPDATE ratings SET rating=? WHERE user_id=? AND book_id=?",

                [rating, user_id, book_id],

                (err2) => {

                    if (err2) {

                        return res.status(500).json(err2);

                    }

                    res.json({
                        message: "Rating berhasil diperbarui"
                    });

                }

            );

        } else {

            db.query(

                "INSERT INTO ratings(user_id, book_id, rating) VALUES(?,?,?)",

                [user_id, book_id, rating],

                (err2) => {

                    if (err2) {

                        return res.status(500).json(err2);

                    }

                    res.json({
                        message: "Rating berhasil ditambahkan"
                    });

                }

            );

        }

    });

};


// Ambil rata-rata rating
exports.getRating = (req, res) => {

    db.query(

        `SELECT
            ROUND(AVG(rating),1) AS average,
            COUNT(*) AS total
        FROM ratings
        WHERE book_id=?`,

        [req.params.bookId],

        (err, result) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json(result[0]);

        }

    );

};