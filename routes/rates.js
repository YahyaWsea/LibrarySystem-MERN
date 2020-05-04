const express = require('express');
const Rate = require('../models/Rate');
const { Book } = require('../models/book');
const User = require('../models/User');


const rateRouter = express.Router();


rateRouter.post('/getBookRate', async (req, res) => {

    const user = await User.findById(req.body.userId);
    if (!user) {
        return res.status(400).send('This user not exist');
    }
    const book = await Book.findById(req.body.bookId);
    if (!book) {
        return res.status(400).send('this book not exist.');
    }


    try {
        const bookRate = await Rate.findOne({ user: req.body.userId, book: req.body.bookId });
        res.send(bookRate);
    } catch (e) {
        res.status(500).send()
    }

})


rateRouter.post('/', async (req, res) => {
    const rate = new Rate(req.body);
    try {
        await rate.save();
        res.status(201).send(rate);
    } catch (e) {
        res.status(400).send();
    }

})

rateRouter.patch('/updateBookRate', async (req, res) => {

    const user = await User.findById(req.body.userId);
    if (!user) {
        return res.status(400).send('This user not exist');
    }
    const book = await Book.findById(req.body.bookId);
    if (!book) {
        return res.status(400).send('this book not exist.');
    }

    const rate = await Rate.updateOne({ user: req.body.userId, book: req.body.bookId },
        {
            rate: req.body.rate,
        }, { new: true });

    if (!rate) {
        return res.status(404).send('There is no rate for this input ...');
    }

    res.send(rate);
});

module.exports = rateRouter;
