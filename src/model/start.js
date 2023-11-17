const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const startSchema = new Schema(
  {
    date: { type: String, required: true },
    value: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Start || mongoose.model('Start', startSchema);
