const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" }

});

module.exports = mongoose.model('User', userSchema);