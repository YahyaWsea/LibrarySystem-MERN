const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', function (next) {
    if (this.password || this.isModified('password')) {
        console.log("hashing fun");
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) throw err;
                this.password = hash;
                next();
            });
        });
    }
});


const User = mongoose.model("User", userSchema);
module.exports = User ;