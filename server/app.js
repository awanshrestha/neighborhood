const express = require("express");
const cookieParser = require("cookie-parser")
const path = require('path')
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.send('Hello')
})

app.use( (req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

module.exports = app;