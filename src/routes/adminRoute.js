const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  updateAdmin,
} = require("../controllers/adminController");
const verifyAdmin = require("../middleware/authMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.put("/update/:id", verifyAdmin, updateAdmin);

module.exports = router;
