const express = require('express');
const app = express();
app.use(express.json());
const ejs = require('ejs');
const { render } = require('ejs');
app.set('view engine', 'ejs');
const axios = require('axios').default;
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres@localhost:5432/cantina');
const { users, scores, inventories } = require('./models');
// -----------------------------------------------------------------------------------------------------
app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/shop', (req, res) => {
    res.render('shop')
})
// -----------------------------------------------------------------------------------------------------
port = 3000
app.listen(port, console.log(`Server is running on port ${port}`));