const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const daySchema = new mongoose.Schema({
    date: Number,
    isSelected: Boolean
});

const monthSchema = new mongoose.Schema({
    days: [daySchema],
    title: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const Month = mongoose.model('Month', monthSchema);


router.get('/:id', auth.verifyToken, User.verify, async (req, res) => {
    try {
        let month = await Month.findOne({
            _id: req.params.id
        }).populate('user');
        res.send(month);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/', auth.verifyToken, User.verify, async (req, res) => {
    try {
        let months = await Month.find({
            user: req.user
        });
        res.send(months);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', auth.verifyToken, User.verify, async (req, res) => {
    try {
        const month = new Month({
            days: req.body.days,
            title: req.body.title,
            user: req.user
        });
        await month.save();
        res.send(month);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/:id', auth.verifyToken, User.verify, async (req, res) => {
    try {
        let month = await Month.findOne({
            _id: req.params.id
        });
        month.title = req.body.title;
        month.days = req.body.days;
        month.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:id', auth.verifyToken, User.verify, async (req, res) => {
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