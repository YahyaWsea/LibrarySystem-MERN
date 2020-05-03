const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

const Category = new mongoose.model('category', categorySchema);

exports.categorySchema = categorySchema;
exports.Category = Category;