const express = require("express");
const {
  createType,
  getAllTypes,
  updateType,
  deleteType,
} = require("../controllers/typeController");
const verifyAdmin = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", verifyAdmin, createType);
router.get("/", getAllTypes);
router.put("/update/:id", verifyAdmin, updateType);
router.delete("/delete/:id", verifyAdmin, deleteType);

module.exports = router;
