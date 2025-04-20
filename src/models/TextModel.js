const mongoose = require("mongoose");

const textSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    yearCreated: Number,
    domain: String,
    topic: String,
    eventLocationTime: String,
    genre: String,
    type: String,
    style: String,
    audienceAge: String,
    audienceLevel: String,
    audienceSize: String,
    sentenceCount: Number,
    wordFormCount: Number,
    sourceType: String,
    source: String,
    publicationDate: String,
    publicationType: String,
    publisher: String,
    subcorpus: String,
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Text", textSchema);
