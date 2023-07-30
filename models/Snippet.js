const mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: [
      {
        code: { type: String, required: true },
        language: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("snippet", SnippetSchema);
