// Packages

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
app.use(express.static('public'));
// -----------------------------------------------------------------------------------------------------
// Global Variables

let username = 'user1';
// -----------------------------------------------------------------------------------------------------
// HTTP requests

// Page enpoints

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/shop', async (req, res) => {
    let inv = await inventories.findOne({
        where: {
            username: username
        }
    })

    res.render('shop', {inv})
})

app.get('/brew', async (req, res) => {
    let inv = await inventories.findOne({
        where: {
            username: username
        }
    })

    res.render('brew', {inv})
})

app.get('/simulate', (req, res) => {
    res.render('simulate')
})

app.get('/results', (req, res) => {
    res.render('results')
})

app.get('/tutorial', (req, res) => {
    res.render('tutorial')
})
// --------------------------------------------------
// Table endpoints

app.get('/users', async (req, res) => {
    if(Object.keys(req.body).length != 0) { // if the request has a body, send error
        res.statusCode = 400
        res.send('GET requests should not have a body.')
    }
    else {
        const people = await users.findAll()
        res.send(people)
    }
})

app.get('/scores', async (req, res) => {
    const games = await scores.findAll({
        order: [['points', 'DESC']] // orders all scores from highest to lowest
    })
    res.send(games)
})

app.get('/inventories', async (req, res) => {
    const stuff = await inventories.findAll()
    res.send(stuff)
})
// ----------------------------------------------------------------------------------------------------
// Server

port = 3000
app.listen(port, console.log(`Server is running on port ${port}`));