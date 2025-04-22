const Text = require("../models/TextModel");
const mongoose = require("mongoose");
const searchTexts = async (req, res) => {
  const keyword = req.query.q;
  const author = req.query.author;
  const typeName = req.query.type;
  const subcorpusName = req.query.subcorpus;

  if (!keyword) {
    return res
      .status(400)
      .json({ error: "Qidiruv so'rovi bo'sh bo'lishi mumkin emas" });
  }

  try {
    const keywordRegex = new RegExp(`\\b${keyword}\\b`, "gi");
    const suffixRegex = new RegExp(`${keyword}\\w*`, "gi");

    // Avval `Type` va `Subcorpus` kolleksiyalaridan ID larini topamiz
    let typeId = null;
    let subcorpusId = null;

    if (typeName) {
      const foundType = await mongoose
        .model("Type")
        .findOne({ name: typeName });
      if (foundType) typeId = foundType._id;
    }

    if (subcorpusName) {
      const foundSubcorpus = await mongoose
        .model("Subcorpus")
        .findOne({ name: subcorpusName });
      if (foundSubcorpus) subcorpusId = foundSubcorpus._id;
    }

    // Asosiy filter
    const filter = {
      ...(author && { author }),
      ...(typeId && { type: typeId }),
      ...(subcorpusId && { subcorpus: subcorpusId }),
      text: { $regex: suffixRegex },
    };

    const results = await mongoose
      .model("Text")
      .find(filter)
      .populate("type")
      .populate("subcorpus");

    const filtered = results.map((doc) => {
      const fullMatches = doc.text.match(keywordRegex) || [];
      const suffixMatches = doc.text.match(suffixRegex) || [];

      return {
        _id: doc._id,
        title: doc.title,
        author: doc.author,
        type: doc.type?.name || null,
        subcorpus: doc.subcorpus?.name || null,
        text: doc.text,
        fullMatchCount: fullMatches.length,
        suffixMatchCount: suffixMatches.length,
        fullSentences: doc.text
          .split(/[.?!]/)
          .filter((sentence) => sentence.match(keywordRegex)),
        suffixSentences: doc.text
          .split(/[.?!]/)
          .filter((sentence) => sentence.match(suffixRegex)),
      };
    });

    res.json(filtered);
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
    const texts = await Text.find()
      .populate("type", "name")
      .populate("subcorpus", "name");
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
