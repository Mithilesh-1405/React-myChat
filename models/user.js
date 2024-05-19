const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  properties: { type: Map, of: String, required: true },
  unsubscribed: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);
