const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');


const userRouter = express.Router();


userRouter.get('/', (req, res) => {
    User.find({})
        .then((users) => {
            res.send(users);
            // console.log(users);
        })
        .catch(err => {
            console.log(err);
        });
});

userRouter.get('/:id', (req, res) => {
    User.findOne({ "_id": req.params.id })
        .then((user) => {
            res.send(user);
        })
        .catch(err => { console.log(err) });
});



userRouter.post('/register', (req, res) => {

    let { username, email, password } = req.body;
    // Validation
    if (!username || !email || !password) {
        return res.status(404).send({ msg: 'Please enter all fields.' });
    }
    // Email Existence
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(404).send('This user exists already.');
        })

    const newUser = new User({
        username,
        email,
        password,
    });
    newUser.save()
        .then(user => {
            jwt.sign(
                { id: user._id },
                config.get('jwtSecret'),
                (err, token) => {
                    if (err) throw err;
                    res.send({
                        token,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            )
        })
        .catch(err => console.log(err));
})

userRouter.post('/login', (req, res) => {
    const { email, password } = req.body;


    // validation
    if (!email || !password) {
        return res.status(400).send({ msg: "Please enter all fields" });
    }

    // Check for user existence
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).send({ msg: "User Doesn't Exist" });
            // Validating password
            bcrypt.compare(password, user.password)
                .then(isMatched => {
                    if (!isMatched) return res.status(400).send({ msg: "Invalid Credentials" });

                    jwt.sign(
                        { id: user._id },
                        config.get('jwtSecret'),
                        (err, token) => {
                            if (err) throw err;
                            res.send({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )

                })
        })
});


userRouter.patch('/:id', (req, res) => {
    let { username, email, password } = req.body;

    User.findById(req.params.id, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.status(404).send('This user is not found.');
        }
        user.password = password;
        user.username = username;
        user.email = email;
        user.save()
            .then(user => {
                res.send(user);
            })
            .catch(err => console.log(err));
    });
})

userRouter.delete('/:id', (req, res) => {

    User.deleteOne({ "_id": req.params.id })
        .then((user) => {
            if (!user) {
                return res.status(404).send('This user is not found.');
            }
            res.send(user);
        })
        .catch(err => console.log(err));
})


module.exports = userRouter;
