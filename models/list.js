const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: { type: String, required: true },
    customProperties: { type: Map, of: String, required: true }
});

module.exports = mongoose.model('List', listSchema);
