const Type = require("../models/TypeModel");

const createType = async (req, res) => {
  try {
    const { name } = req.body;

    const exisType = await Type.findOne({ name });
    if (exisType) {
      return res.status(409).json({ message: "Bu tur avval yaratilgan" });
    }

    const newType = new Type({ name });
    const saved = await newType.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await Type.findByIdAndUpdate(id, { name }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Tur topilmadi" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllTypes = async (req, res) => {
  try {
    const list = await Type.find();
    if (!list) {
      return res.status(404).json({ message: "Tur topilmadi" });
    }
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Xatolik", error: err.message });
  }
};

const deleteType = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Type.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Tur topilmadi" });
    }

    res.json({ message: "Tur muvaffaqiyatli o‘chirildi" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllTypes, createType, updateType, deleteType };
