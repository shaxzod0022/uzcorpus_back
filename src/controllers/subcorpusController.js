const Subcorpus = require("../models/SubcorpusModel");

const createSubcorpus = async (req, res) => {
  try {
    const { name } = req.body;

    const existSubcorpus = await Subcorpus.findOne({ name });
    if (existSubcorpus) {
      return res
        .status(409)
        .json({ message: "Bu korpus bo‘limi avval yaratilgan" });
    }

    const newSubcorpus = new Subcorpus({ name });
    const saved = await newSubcorpus.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateSubcorpus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await Subcorpus.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Korpus bo‘limi topilmadi" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSubcorpus = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Subcorpus.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Korpus bo‘limi topilmadi" });
    }

    res.json({ message: "Korpus bo‘limi muvaffaqiyatli o‘chirildi" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllSubcorpus = async (req, res) => {
  try {
    const list = await Subcorpus.find();
    if (!list) {
      return res.status(404).json({ message: "Korpus bo‘limi topilmadi" });
    }
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Xatolik", error: err.message });
  }
};

module.exports = {
  getAllSubcorpus,
  createSubcorpus,
  updateSubcorpus,
  deleteSubcorpus,
};
