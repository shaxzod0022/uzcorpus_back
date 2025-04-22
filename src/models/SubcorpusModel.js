const mongoose = require("mongoose");

const subcorpusSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Subcorpus", subcorpusSchema);
