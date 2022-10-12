// Packages

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const simulate = require('./public/js/simulation');
const { render } = require("ejs");
const axios = require("axios").default;
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://postgres@localhost:5432/cantina");
const { users, scores, inventories, drinks } = require("./models");
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
  let user = await users.findOne({
    where: {
      username: req.body.username
    }
  })
  
  if (user == null && req.body.password === req.body.confirmpass) {
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
    drinks.create({
      username: req.body.username,
      vemo: 0,
      vemoprice: 40,
      moze: 0,
      mozeprice: 40,
      veze: 0,
      vezeprice: 40,
      vemospanu: 0,
      vemospanuprice: 55,
      mozespanu: 0,
      mozespanuprice: 55,
      vezespanu: 0,
      vezespanuprice: 55
    });
    res.redirect("/");
  }
  else{
  res.redirect("/register");
  }
});

app.get("/logout", async (req, res) => {
  username = '';
  res.redirect("/");
})

app.post("/reset", async (req, res) => {
  let inv = await inventories.findOne({
    where: {
      username: username
    }
  })
  let bar = await drinks.findOne({
    where: {
      username: username
    }
  })
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
  inv.update({
    day: 1,
    veax: 0,
    mozuc: 0,
    zeyoc: 0,
    gloop: 0,
    spanu: 0,
    credits: 2000,
    weather: weather,
    popularity: 0
  })
  bar.update({
    vemo: 0,
    vemoprice: 40,
    moze: 0,
    mozeprice: 40,
    veze: 0,
    vezeprice: 40,
    vemospanu: 0,
    vemospanuprice: 55,
    mozespanu: 0,
    mozespanuprice: 55,
    vezespanu: 0,
    vezespanuprice: 55
  })
  res.redirect("/shop")
})

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
        }
      });
    if (inv.credits >= 100){
      buyVeax = inv.veax + 15
      spendCredits = inv.credits - 100
      await inv.update({
          veax: buyVeax,
          credits: spendCredits
      })}
    res.redirect("/shop")
    
})

app.post("/buymozuc", async (req, res) => {
    let inv = await inventories.findOne({
        where: {
          username: username,
        }
      });
    if (inv.credits >= 100){
      buyMozuc = inv.mozuc + 15
      spendCredits = inv.credits - 100
      await inv.update({
          mozuc: buyMozuc,
          credits: spendCredits
      })
    }
    res.redirect("/shop")
})

app.post("/buyzeyoc", async (req, res) => {
    let inv = await inventories.findOne({
        where: {
          username: username,
        }
      });
    if (inv.credits >= 100){
      buyZeyoc = inv.zeyoc + 15
      spendCredits = inv.credits - 100
      await inv.update({
          zeyoc: buyZeyoc,
          credits: spendCredits
      })
    }
    res.redirect("/shop")
})

app.post("/buygloop", async (req, res) => {
    let inv = await inventories.findOne({
        where: {
          username: username,
        }
      });
    if (inv.credits >= 200){
      buyGloop = inv.gloop + 10
      spendCredits = inv.credits - 200
      await inv.update({
          gloop: buyGloop,
          credits: spendCredits
      })
    }
    res.redirect("/shop")
})

app.post("/buyspanu", async (req, res) => {
    let inv = await inventories.findOne({
        where: {
          username: username,
        }
      });
    if (inv.credits >= 300){
      buySpanu = inv.spanu + 5
      spendCredits = inv.credits - 300
      await inv.update({
          spanu: buySpanu,
          credits: spendCredits
      })
    }
    res.redirect("/shop")
})

// -------------------------
// Brew endpoints

app.get("/brew", async (req, res) => {
  if (username == ''){
    res.redirect("/")
  }
  else {
    let inv = await inventories.findOne({
      where: {
        username: username,
      }
    });

    let bar = await drinks.findOne({
      where: {
        username:username
      }
    });

    res.render("brew", { inv, bar });
  }
});

app.post("/setprice", async (req, res) => {
  let bar = await drinks.findOne({
    where: {
      username: username,
    }
  });

  await bar.update({
    vemoprice: req.body.vemo,
    mozeprice: req.body.moze,
    vezeprice: req.body.veze,
    vemospanuprice: req.body.vemospanu,
    mozespanuprice: req.body.mozespanu,
    vezespanuprice: req.body.vezespanu
  });

  res.redirect("/brew")
});

app.post("/brewvemo", async (req, res) => {
  let inv = await inventories.findOne({
      where: {
        username: username,
      }
    });
  if (inv.veax > 0 && inv.mozuc > 0 && inv.gloop > 0){
    useVeax = inv.veax - 1
    useMozuc = inv.mozuc - 1
    useGloop = inv.gloop - 1
    await inv.update({
        veax: useVeax,
        mozuc: useMozuc,
        gloop: useGloop
    });

    let bar = await drinks.findOne({
      where: {
        username: username,
      }
    });
    mixVemo = bar.vemo + 1
    await bar.update({
      vemo: mixVemo
    });
  }
  res.redirect("/brew")
});

app.post("/brewmoze", async (req, res) => {
  let inv = await inventories.findOne({
      where: {
        username: username,
      }
    });
  if (inv.mozuc > 0 && inv.zeyoc > 0 && inv.gloop > 0){
    useMozuc = inv.mozuc - 1
    useZeyoc = inv.zeyoc - 1
    useGloop = inv.gloop - 1
    await inv.update({
        mozuc: useMozuc,
        zeyoc: useZeyoc,
        gloop: useGloop
    });

    let bar = await drinks.findOne({
      where: {
        username: username,
      }
    });
    mixMoze = bar.moze + 1
    await bar.update({
      moze: mixMoze
    });
  }
  res.redirect("/brew")
});

app.post("/brewveze", async (req, res) => {
  let inv = await inventories.findOne({
      where: {
        username: username,
      }
    });
  if (inv.veax > 0 && inv.zeyoc > 0 && inv.gloop > 0){
    useVeax = inv.veax - 1
    useZeyoc = inv.zeyoc - 1
    useGloop = inv.gloop - 1
    await inv.update({
        veax: useVeax,
        zeyoc: useZeyoc,
        gloop: useGloop
    });

    let bar = await drinks.findOne({
      where: {
        username: username,
      }
    });
    mixVeze = bar.veze + 1
    await bar.update({
      veze: mixVeze
    });
  }
  res.redirect("/brew")
});

app.post("/brewvemospanu", async (req, res) => {
  let inv = await inventories.findOne({
      where: {
        username: username,
      }
    });
  if (inv.veax > 0 && inv.mozuc > 0 && inv.gloop > 0 && inv.spanu > 0){
    useVeax = inv.veax - 1
    useMozuc = inv.mozuc - 1
    useGloop = inv.gloop - 1
    useSpanu = inv.spanu - 1
    await inv.update({
        veax: useVeax,
        mozuc: useMozuc,
        gloop: useGloop,
        spanu: useSpanu
    });

    let bar = await drinks.findOne({
      where: {
        username: username,
      }
    });
    mixVemoSpanu = bar.vemospanu + 1
    await bar.update({
      vemospanu: mixVemoSpanu
    });
  }  
  res.redirect("/brew")
});

app.post("/brewmozespanu", async (req, res) => {
  let inv = await inventories.findOne({
      where: {
        username: username,
      }
    });
  if (inv.mozuc > 0 && inv.zeyoc > 0 && inv.gloop > 0 && inv.spanu > 0){
    useMozuc = inv.mozuc - 1
    useZeyoc = inv.zeyoc - 1
    useGloop = inv.gloop - 1
    useSpanu = inv.spanu - 1
    await inv.update({
        mozuc: useMozuc,
        zeyoc: useZeyoc,
        gloop: useGloop,
        spanu: useSpanu
    });

    let bar = await drinks.findOne({
      where: {
        username: username,
      }
    });
    mixMozeSpanu = bar.mozespanu + 1
    await bar.update({
      mozespanu: mixMozeSpanu
    });
  }
  res.redirect("/brew")
});

app.post("/brewvezespanu", async (req, res) => {
  let inv = await inventories.findOne({
      where: {
        username: username,
      }
    });
  if (inv.veax > 0 && inv.zeyoc > 0 && inv.gloop > 0 && inv.spanu > 0){
    useVeax = inv.veax - 1
    useZeyoc = inv.zeyoc - 1
    useGloop = inv.gloop - 1
    useSpanu = inv.spanu - 1
    await inv.update({
        veax: useVeax,
        zeyoc: useZeyoc,
        gloop: useGloop,
        spanu: useSpanu
    });

    let bar = await drinks.findOne({
      where: {
        username: username,
      }
    });
    mixVezeSpanu = bar.vezespanu + 1
    await bar.update({
      vezespanu: mixVezeSpanu
    });
  }
  res.redirect("/brew")
});

// -------------------------

app.get("/simulate", async (req, res) => {
  if (username == ''){
    res.redirect("/")
  }
  else{
    let inv = await inventories.findOne({
      where: {
        username: username,
      }
    });

    res.render("simulate", { inv });
  }
});

app.post("/openbar"), async (req, res) => {
  let inv = await inventories.findOne({
    where: {
      username: username
    }
  })

  let bar = await drinks.findOne({
    where: {
      username: username
    }
  })

  simulate(inv, bar);
}

// -------------------------

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
