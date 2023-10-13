const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  item_name: { type: String, required: true },
  image_url: { type: String, required: false },
  description: { type: String, required: false },
});

module.exports = mongoose.models.Menu || mongoose.model('Menu', menuSchema);
