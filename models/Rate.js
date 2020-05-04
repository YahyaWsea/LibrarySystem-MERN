const mongoose = require('mongoose')

// const bookSchema = require('./book');

const rateSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 10
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
        // type: bookSchema
    }

})

const Rate = new mongoose.model('Rate', rateSchema);

module.exports =  Rate;
