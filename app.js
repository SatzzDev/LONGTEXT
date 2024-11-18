const express = require("express");
const mongoose = require("mongoose");
const izinRoutes = require("./routes/longtext");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


// Routes
app.use("/", izinRoutes);

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
