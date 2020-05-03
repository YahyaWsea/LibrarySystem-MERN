
const { Category } = require('../models/category');
const mongoose = require('mongoose');
const express = require('express');
const { Book } = require('../models/book');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.send(books);
    } catch (e) {
        res.status(500).send()
    }

})


router.post('/', async (req, res) => {

    try {
        const category = await Category.findById(req.body.categoryId)
        if (!category) {
            res.status(400).send('Invalid Category');
            return;
        }


        let book = new Book({
            title: req.body.title,
            author: req.body.author,
            category: category,
            price: req.body.price,
            quantity: req.body.quantity
        });


        await book.save();
        res.send(book);


    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
})

router.patch('/:id', async (req, res) => {

    const category = await Category.findById(req.body.categoryId);
    if (!category) {
        return res.status(400).send('Invalid Category.');
    }

    const book = await Book.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            author: req.body.author,
            category: category,
            price: req.body.price,
            quantity: req.body.quantity
        }, { new: true });

    if (!book) {
        return res.status(404).send('The book with the given ID was not found.');
    }

    res.send(book);
});

router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndRemove(req.params.id);

        if (!book) {
            return res.status(404).send('The book with the given ID was not found.');
        }

        res.send(book);
    } catch (e) {
        res.status(404).send()
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).send('The movie with the given ID was not found.');
        }

        res.send(book);
    } catch (e) {
        res.status(500).send()
    }

});

module.exports = router;
