const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ======================
// REGISTER
// ======================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    // Cek email sudah ada atau belum
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        if (result.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email sudah terdaftar",
          });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Simpan user
        db.query(
          "INSERT INTO users(name,email,password) VALUES (?,?,?)",
          [name, email, hashPassword],
          (err, result) => {
            if (err) {
              return res.status(500).json(err);
            }

            res.json({
              success: true,
              message: "Register Berhasil",
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// ======================
// LOGIN
// ======================
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan Password wajib diisi",
    });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Email tidak ditemukan",
        });
      }

      const user = result[0];

      const cocok = await bcrypt.compare(password, user.password);

      if (!cocok) {
        return res.status(401).json({
          success: false,
          message: "Password salah",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.json({
        success: true,
        message: "Login Berhasil",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
};