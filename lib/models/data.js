const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  { name: String },
  {
    timestamps: false,
    strict: false,
  }
);

module.exports = mongoose.models.Data || mongoose.model("Data", DataSchema);
