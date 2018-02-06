const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// установка схемы
const blogScheme = new Schema({
    text: String,
    title: String
});

module.exports = mongoose.model('Blog', blogScheme);
