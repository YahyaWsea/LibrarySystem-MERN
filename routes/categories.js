const mongoose = require('mongoose');
const express = require('express');
const { Category } = require('../models/category');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.send(categories);
    } catch (e) {
        res.status(500).send();
    }

})

router.post('/', async (req, res) => {
    const category = new Category(req.body);
    try {
        await category.save();
        res.status(201).send(category);
    } catch (e) {
        res.status(400).send();
    }

})

router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(404).send({ error: "Invalid Update!" });
    }

    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.send(404).send();
        }

        updates.forEach(update => category[update] = req.body[update]);

        await category.save();
        res.send(category);

    } catch (e) {
        res.status(400).send();
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        if (!category) {
            return res.status(404).send('The category with the given ID was not found.');
        }

        res.send(category);
    } catch (e) {
        res.status(404).send();
    }

})

router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).send('The category with the given ID was not found.');
        }

        res.send(category);
    } catch (e) {
        res.status(500).send();
    }

});

module.exports = router;
