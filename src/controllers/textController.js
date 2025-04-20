const Text = require("../models/TextModel");

const searchTexts = async (req, res) => {
  const keyword = req.query.q;

  if (!keyword) {
    return res
      .status(400)
      .json({ error: "Qidiruv so'rovi bo'sh bo'lishi mumkin emas" });
  }

  try {
    const results = await Text.find({
      text: { $regex: keyword, $options: "i" },
    }).select("-_id -__v -createdAt -updatedAt");

    if (results.length === 0) {
      return res.status(404).json({ message: "Ma'lumot topilmadi" });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
};

const addText = async (req, res) => {
  try {
    const newText = new Text(req.body);
    await newText.save();
    res.status(201).json(newText);
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
};

const getAllTexts = async (req, res) => {
  try {
    const texts = await Text.find();
    if (!texts) {
      return res.status(404).json({ message: "Ma'lumot topilmadi" });
    }
    res.json(texts);
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
};

const getTextById = async (req, res) => {
  try {
    const text = await Text.findById(req.params.id);
    if (!text) {
      return res.status(404).json({ message: "Ma'lumot topilmadi" });
    }
    res.json(text);
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err.message });
  }
};

const deleteText = async (req, res) => {
  try {
    const text = await Text.findByIdAndDelete(req.params.id);
    if (!text) {
      return res.status(404).json({ message: "Ma'lumot topilmadi" });
    }
    res.status(200).json({ message: "Muvaffaqiyatli o'chirildi", text });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

module.exports = { searchTexts, addText, getAllTexts, getTextById, deleteText };
