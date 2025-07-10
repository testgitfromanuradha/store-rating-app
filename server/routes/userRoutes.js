// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

// Get all stores with user-specific rating
router.get("/stores", authMiddleware, userController.getStores);

// Submit or update a rating
router.post("/rate", authMiddleware, userController.submitRating);

module.exports = router;
