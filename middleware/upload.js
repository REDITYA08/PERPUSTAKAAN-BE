const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        if (file.fieldname === "cover") {

            cb(null, "uploads/cover");

        } else if (file.fieldname === "pdf") {

            cb(null, "uploads/pdf");

        }

    },

    filename: function (req, file, cb) {

        const uniqueName = Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

const fileFilter = (req, file, cb) => {

    if (file.fieldname === "cover") {

        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {

            cb(null, true);

        } else {

            cb(new Error("Cover harus berupa gambar"));

        }

    } else if (file.fieldname === "pdf") {

        if (file.mimetype === "application/pdf") {

            cb(null, true);

        } else {

            cb(new Error("File harus PDF"));

        }

    }

};

const upload = multer({

    storage,

    fileFilter

}).fields([

    {

        name: "cover",

        maxCount: 1

    },

    {

        name: "pdf",

        maxCount: 1

    }

]);

module.exports = upload;