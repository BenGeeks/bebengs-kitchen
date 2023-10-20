const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    block: { type: String, required: false },
    lot: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
