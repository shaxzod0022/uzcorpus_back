const mongoose = require("mongoose");

const textSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    yearCreated: { type: Number, required: true },
    domain: String,
    topic: String,
    eventLocationTime: String,
    genre: String,
    type: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
    style: String,
    audienceAge: String,
    audienceLevel: String,
    audienceSize: String,
    sourceType: String,
    source: String,
    publicationDate: String,
    publicationType: String,
    publisher: String,
    subcorpus: { type: mongoose.Schema.Types.ObjectId, ref: "Subcorpus" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Text", textSchema);
