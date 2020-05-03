const express = require('express');
const bcypt = require('bcryptjs');
const User = require('../models/User');

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
            if (!user) {
                return res.status(404).send('This user is not found.');
            }
            res.send(user);
        })
        .catch(err => { console.log(err) });
});



userRouter.post('/register', (req, res) => {

    let { username, email, password } = req.body;
    // Validation
    if (!username || !email || !password) {
        return res.status(404).send('Please enter all fields.');
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
    // console.log(newUser);


    bcypt.hash(req.body.password, 10)
        .then(hashed_password => {
            newUser.password = hashed_password;
            newUser.save()
                .then(user => {
                    res.send(user);
                })
                .catch(err => console.log(err));
        });
})

userRouter.patch('/:id', (req, res) => {
    let { username, email, password } = req.body;

    User.findById(req.params.id, (err, user) => {
        // if (err) return false;
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
