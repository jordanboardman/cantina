// Packages

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const { render } = require("ejs");
const axios = require("axios").default;
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://postgres@localhost:5432/cantina");
const { users, scores, inventories } = require("./models");
const e = require("express");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
// -----------------------------------------------------------------------------------------------------
// Global Variables

let username = "";
// -----------------------------------------------------------------------------------------------------
// HTTP requests

// --------------------------------------------------
// Page endpoints

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/userlogin", async (req, res) => {
  let user = await users.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (user == null){
    res.redirect("/")
  }
  else {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.redirect("/shop");
      username = req.body.username;
    } else {
      res.redirect("/");
    }
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/newuser", async (req, res) => {
  if (req.body.password === req.body.confirmpass) {
    const hash = await bcrypt.hash(req.body.password, 8);
    users.create({
      username: req.body.username,
      password: hash,
    });
    const weatherChance = Math.random() * 100;
    if (weatherChance < 50){
      weather = 'Average'
    }
    else if (weatherChance < 75){
      weather = 'Hot'
    }
    else {
      weather = 'Cold'
    }
    inventories.create({
      username: req.body.username,
      day: 1,
      veax: 0,
      mozuc: 0,
      zeyoc: 0,
      gloop: 0,
      spanu: 0,
      credits: 2000,
      weather: weather,
      popularity: 0
    });
  }
  res.redirect("/");
});

// -------------------------
// Shop endpoints

app.get("/shop", async (req, res) => {
    if (username == ''){
      res.redirect("/")
    }
    else {
      let inv = await inventories.findOne({
        where: {
          username: username,
        },
      });
    
      res.render("shop", { inv });
    }
  });

app.post("/buyveax", async (req, res) => {
    let inv = await inventories.findOne({
        where: {
          username: username,
        },
      });
    buyVeax = inv.veax + 15
    spendCredits = inv.credits - 100
    await inv.update({
        veax: buyVeax,
        credits: spendCredits
    })
    res.redirect("/shop")
})

app.post("/buymozuc", async (req, res) => {
    let inv = await inventories.findOne({
        where: {
          username: username,
        },
      });
    buyMozuc = inv.mozuc + 15
    spendCredits = inv.credits - 100
    await inv.update({
        mozuc: buyMozuc,
        credits: spendCredits
    })
    res.redirect("/shop")
})

app.post("/buyzeyoc", async (req, res) => {
    let inv = await inventories.findOne({
        where: {
          username: username,
        },
      });
    buyZeyoc = inv.zeyoc + 15
    spendCredits = inv.credits - 100
    await inv.update({
        zeyoc: buyZeyoc,
        credits: spendCredits
    })
    res.redirect("/shop")
})

app.post("/buygloop", async (req, res) => {
    let inv = await inventories.findOne({
        where: {
          username: username,
        },
      });
    buyGloop = inv.gloop + 10
    spendCredits = inv.credits - 200
    await inv.update({
        gloop: buyGloop,
        credits: spendCredits
    })
    res.redirect("/shop")
})

app.post("/buyspanu", async (req, res) => {
    let inv = await inventories.findOne({
        where: {
          username: username,
        },
      });
    buySpanu = inv.spanu + 5
    spendCredits = inv.credits - 300
    await inv.update({
        spanu: buySpanu,
        credits: spendCredits
    })
    res.redirect("/shop")
})

// -------------------------

app.get("/brew", async (req, res) => {
  if (username == ''){
    res.redirect("/")
  }
  else {
    let inv = await inventories.findOne({
      where: {
        username: username,
      },
    });

    res.render("brew", { inv });
  }
});

app.get("/simulate", (req, res) => {
  if (username == ''){
    res.redirect("/")
  }
  else{
    res.render("simulate");
  }
});

app.get("/results", (req, res) => {
  if (username == ''){
    res.redirect("/")
  }
  else{
    res.render("results");
  }
});

app.get("/tutorial", (req, res) => {
  res.render("tutorial");
});

// --------------------------------------------------
// Table endpoints

// -------------------------
// Users endpoints

app.get("/users", async (req, res) => {
  // GET all
  if (Object.keys(req.body).length != 0) {
    // if the request has a body, send error
    res.statusCode = 400;
    res.send("GET requests should not have a body.");
  } else {
    const people = await users.findAll();
    res.send(people);
  }
});

// -------------------------
// Scores endpoints

app.get("/scores", async (req, res) => {
  // GET all
  if (Object.keys(req.body).length != 0) {
    // if the request has a body, send error
    res.statusCode = 400;
    res.send("GET requests should not have a body.");
  } else {
    const games = await scores.findAll({
      order: [["points", "DESC"]], // orders all scores from highest to lowest
    });
    res.send(games);
  }
});

// -------------------------
// Inventories endpoints

app.get("/inventories", async (req, res) => {
  // GET all
  if (Object.keys(req.body).length != 0) {
    // if the request has a body, send error
    res.statusCode = 400;
    res.send("GET requests should not have a body.");
  } else {
    const stuff = await inventories.findAll();
    res.send(stuff);
  }
});
// ----------------------------------------------------------------------------------------------------
// Server

port = 3000;
app.listen(
  process.env.PORT || port,
  console.log(`Server is running on port ${port}`)
);
