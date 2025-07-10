const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const app = express();
const User = require("./models/User");
const Store = require("./models/Store");
const Rating = require("./models/Rating");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/ratings", require("./routes/ratingRoutes"));

app.use("/api/owner", require("./routes/storeOwnerRoutes"));

// DB Sync
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
});

module.exports = app;
