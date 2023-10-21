const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Address || mongoose.model('Address', addressSchema);
