const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/submit", authMiddleware("user"), ratingController.submitRating);
router.get("/my", authMiddleware("user"), ratingController.getUserRatings);

module.exports = router;
