// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");

// router.post("/add-user", adminController.addUser);
// router.post("/add-store", adminController.addStore);
// router.get("/dashboard", adminController.getDashboard);
// router.get("/users", adminController.getUsers);
// router.get("/stores", adminController.getStores);

// module.exports = router;

const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware"); // ✅ import middleware

// ✅ All routes below are protected to allow only 'admin' role

router.post("/add-user", authMiddleware("admin"), adminController.addUser);
router.post("/add-store", authMiddleware("admin"), adminController.addStore);
router.get("/dashboard", authMiddleware("admin"), adminController.getDashboard);
router.get("/users", authMiddleware("admin"), adminController.getUsers);
router.get("/stores", authMiddleware("admin"), adminController.getStores);

module.exports = router;
