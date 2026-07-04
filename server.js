require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// Database
require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const genreRoutes = require("./routes/genreRoutes");
const commentRoutes = require("./routes/commentRoutes");    
const bookRoutes = require("./routes/bookRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const ratingRoutes = require("./routes/ratingRoutes");


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use("/api", authRoutes);
app.use("/api", genreRoutes);
app.use("/api", bookRoutes);
app.use("/api", favoriteRoutes);
app.use("/api", commentRoutes);
app.use("/api", ratingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running : http://localhost:${PORT}`);
});