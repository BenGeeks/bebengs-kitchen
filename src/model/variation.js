const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const variationSchema = new Schema(
  {
    menuId: { type: String, required: true },
    size: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Variation || mongoose.model('Variation', variationSchema);
