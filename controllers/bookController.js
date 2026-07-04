const db = require("../config/db");

// =============================
// GET Semua Buku
// =============================
exports.getBooks = (req, res) => {

    const sql = `
    SELECT
    books.*,
    genres.nama_genre
    FROM books
    JOIN genres
    ON books.genre_id=genres.id
    ORDER BY books.id DESC
    `;

    db.query(sql,(err,result)=>{

        if(err){

            return res.status(500).json(err);

        }

        res.json(result);

    });

};

// =============================
// GET DETAIL
// =============================
exports.getBookById=(req,res)=>{

    db.query(

        "SELECT * FROM books WHERE id=?",

        [req.params.id],

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json(result[0]);

        }

    );

};

// =============================
// TAMBAH BUKU + COVER + PDF
// =============================
exports.createBook = (req, res) => {

    console.log("BODY :", req.body);
    console.log("FILES :", req.files);

    const {

        judul,

        penulis,

        genre_id,

        deskripsi

    } = req.body;

    let cover = null;
    let pdf = null;

    if (req.files) {

        if (req.files.cover) {

            cover = req.files.cover[0].filename;

        }

        if (req.files.pdf) {

            pdf = req.files.pdf[0].filename;

        }

    }

    const sql = `
        INSERT INTO books
        (judul,penulis,genre_id,deskripsi,cover,file_pdf)
        VALUES(?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            judul,
            penulis,
            genre_id,
            deskripsi,
            cover,
            pdf
        ],
        (err) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                success: true,

                message: "Buku berhasil ditambahkan"

            });

        }
    );

};

// =============================
// UPDATE
// =============================
exports.updateBook = (req, res) => {

    const {

        judul,

        penulis,

        genre_id,

        deskripsi

    } = req.body;

    let cover = null;
    let pdf = null;

    if (req.files) {

        if (req.files.cover) {

            cover = req.files.cover[0].filename;

        }

        if (req.files.pdf) {

            pdf = req.files.pdf[0].filename;

        }

    }

    let sql = `
        UPDATE books
        SET
            judul = ?,
            penulis = ?,
            genre_id = ?,
            deskripsi = ?
    `;

    const values = [

        judul,

        penulis,

        genre_id,

        deskripsi

    ];

    if (cover) {

        sql += `, cover = ?`;

        values.push(cover);

    }

    if (pdf) {

        sql += `, file_pdf = ?`;

        values.push(pdf);

    }

    sql += ` WHERE id = ?`;

    values.push(req.params.id);

    db.query(

        sql,

        values,

        (err) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                success: true,

                message: "Buku berhasil diupdate"

            });

        }

    );

};
// =============================
// DELETE
// =============================
exports.deleteBook = (req, res) => {

    db.query(
        "DELETE FROM books WHERE id=?",
        [req.params.id],
        (err) => {

            console.log(err)

            if(err){
                return res.status(500).json(err)
            }

            res.json({
                success:true
            })

        }
    )

}