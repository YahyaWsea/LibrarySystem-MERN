const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength:8
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: String,
        default: true
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User ;