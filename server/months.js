const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const daySchema = new mongoose.Schema({
    date: Number,
    isSelected: Boolean
});

const weekSchema = new mongoose.Schema({
    days: [daySchema],
    isSelected: Boolean
});

const monthSchema = new mongoose.Schema({
    weeks: [weekSchema],
    title: String
});

const Month = mongoose.model('Month', monthSchema);


router.get('/:id', async (req, res) => {
    try {
        let month = await Month.findOne({
            _id: req.params.id
        });
        res.send(month);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/', async (req, res) => {
    try {
        let months = await Month.find();
        res.send(months);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const month = new Month({
        weeks: req.body.weeks,
        title: req.body.title
    });
    try {
        await Month.save();
        res.send(month);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let month = await Month.findOne({
            _id: req.params.id
        });
        month.title = req.body.title;
        month.weeks = req.body.weeks;
        month.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Month.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Month,
    routes: router
}