const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    itemName: { type: String, required: true },
    imageUrl: { type: String, required: false },
    thumbnailUrl: { type: String, required: false },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Menu || mongoose.model('Menu', menuSchema);
