const express = require("express");
const {
  createSubcorpus,
  getAllSubcorpus,
  updateSubcorpus,
  deleteSubcorpus,
} = require("../controllers/subcorpusController");
const verifyAdmin = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", verifyAdmin, createSubcorpus);
router.get("/", getAllSubcorpus);
router.put("/update/:id", verifyAdmin, updateSubcorpus);
router.delete("/delete/:id", verifyAdmin, deleteSubcorpus);

module.exports = router;
