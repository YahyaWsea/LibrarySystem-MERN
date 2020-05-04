const mongoose = require('mongoose');
const categorySchema = require('./category');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    author: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    category: {
        type: categorySchema,
        required: true
    },
    price: {
        type: Number,
        required: true,
        // min: 0,
        // max: 255

    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

const Book = new mongoose.model('book', bookSchema);

exports.bookSchema = bookSchema;
exports.Book = Book;