const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  emailAddress: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
