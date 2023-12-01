const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expensesSchema = new Schema(
  {
    item: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    total: { type: Number, required: true },
    // isGcash: { type: Boolean, required: true },
    source: { type: String, enum: ['Cash', 'G-cash', 'Capital'], required: true },
    expenseDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Expenses || mongoose.model('Expenses', expensesSchema);
