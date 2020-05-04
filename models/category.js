const mongoose = require('mongoose');
const bookSchema = require('./book');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    books: [{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'book'
    }]
})

const Category = new mongoose.model('category', categorySchema);

exports.categorySchema = categorySchema;
exports.Category = Category;