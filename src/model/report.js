const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    date: { type: Date, required: true },
    capital: { type: Number, required: true },
    withdrawal: { type: Number, required: true },
    sales: { type: Number, required: true },
    expenses: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Report || mongoose.model('Report', reportSchema);
