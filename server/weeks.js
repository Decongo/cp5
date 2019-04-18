const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

const users = require("./users.js");
const User = users.model;

const hourSchema = new mongoose.Schema({
    hour: Number,
    isSelected: Boolean
});

const daySchema = new mongoose.Schema({
    hours: [hourSchema],
    isSelected: Boolean
});

const weekSchema = new mongoose.Schema({
    days: [daySchema],
    title: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

const Week = mongoose.model('Week', weekSchema);

router.get('/:id', auth.verifyToken, User.verify, async (req, res) => {
    try {
        let week = await Week.findOne({
            _id: req.params.id
        }).populate('user');
        res.send(week);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.get('/', auth.verifyToken, User.verify, async (req, res) => {
    try {
        let week = await Week.find({
            user: req.user
        });
        res.send(week);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.post('/', auth.verifyToken, User.verify, async (req, res) => {
    try {
        const week = new Week({
            days: req.body.days,
            title: req.body.title,
            user: req.user
        });
        await week.save();
        res.send(week);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.put('/:id', auth.verifyToken, User.verify, async (req, res) => {
    console.log("Got here");
    try {
        let week = await Week.findOne({
            _id: req.params.id
        });
        week.days = req.body.days;

        week.save();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

router.delete('/:id', auth.verifyToken, User.verify, async (req, res) => {
    try {
        await Week.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Week,
    routes: router
}
