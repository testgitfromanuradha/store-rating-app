const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/ownerController");
const auth = require("../middleware/auth");

router.get("/dashboard", auth, ownerController.getStoreRatings);

module.exports = router;
