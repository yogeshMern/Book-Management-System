const express = require('express');
const dotenv = require("dotenv");
const bookRoutes = require("./routes/bookRoutes")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json())
app.use("/books", bookRoutes);

dotenv.config({ path: "./config/config.env" });

module.exports = app;

