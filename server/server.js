const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/schedule_full', {
    useNewUrlParser: true
});

const weeks = require("./weeks.js");
app.use("/api/weeks", weeks.routes);

const months = require("./months.js");
app.use("/api/months", months.routes);

app.listen(3002, () => console.log('Server listening on port 3002!'));