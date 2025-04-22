const express = require("express");
const router = express.Router();
const {
  addText,
  getAllTexts,
  getTextById,
  searchTexts,
  deleteText,
} = require("../controllers/textController");
const verifyAdmin = require("../middleware/authMiddleware");

router.get("/search", searchTexts);
router.post("/add",  addText);
router.get("/", getAllTexts);
router.get("/one-text/:id", getTextById);
router.delete("/delete/:id", verifyAdmin, deleteText);

module.exports = router;
