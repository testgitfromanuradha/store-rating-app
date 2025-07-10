const express = require("express");
const router = express.Router();
const storeOwnerController = require("../controllers/storeOwnerController");
const authMiddleware = require("../middlewares/authMiddleware");

// ✅ Only accessible by users with role = "owner"
router.get("/my-ratings", authMiddleware("owner"), storeOwnerController.getMyStoreRatings);

module.exports = router;
