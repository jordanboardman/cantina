let simulate = (inv, bar) => {
    let varkroBonus = 0;
    let ukrelBonus = 0;
    let ghavikBonus = 0;
    if (inv.weather == 'Hot'){
    varkroBonus = 15
    }
    else if (inv.weather == 'Average'){
    ukrelBonus = 15
    }
    else if (inv.weather == 'Cold'){
    ghavikBonus = 15
    }

    let varkro = Math.floor((Math.random() * 20)) + Math.floor((Math.random() * inv.popularity) / 2) + varkroBonus;
    let ukrel = Math.floor(Math.random() * 20) + Math.floor((Math.random() * inv.popularity) / 2) + ukrelBonus;
    let ghavik = Math.floor(Math.random() * 20) + Math.floor((Math.random() * inv.popularity) / 2) + ghavikBonus;

    let vemoSpanu = buyDrinks(bar.vemospanuprice, bar.vemospanu, inv.popularity, varkro, 'Sweet');
    let vemoSpanuPurchased = vemoSpanu[0];
    let mozeSpanu = buyDrinks(bar.mozespanuprice, bar.mozespanu, inv.popularity, ukrel, 'Sweet');
    let mozeSpanuPurchased = mozeSpanu[0];
    let vezeSpanu = buyDrinks(bar.vezespanuprice, bar.vezespanu, inv.popularity, ghavik, 'Sweet');
    let vezeSpanuPurchased = vezeSpanu[0];

    let vemo = buyDrinks(bar.vemoprice, bar.vemo, inv.popularity, vemoSpanu[1], 'Bitter');
    let vemoPurchased = vemo[0];
    let moze = buyDrinks(bar.mozeprice, bar.moze, inv.popularity, mozeSpanu[1], 'Bitter');
    let mozePurchased = moze[0];
    let veze = buyDrinks(bar.vezeprice, bar.veze, inv.popularity, vezeSpanu[1], 'Bitter');
    let vezePurchased = veze[0];

    let vemoSpanuCredits = vemoSpanuPurchased * bar.vemospanuprice;
    let mozeSpanuCredits = mozeSpanuPurchased * bar.mozespanuprice;
    let vezeSpanuCredits = vezeSpanuPurchased * bar.vezespanuprice;
    let vemoCredits = vemoPurchased * bar.vemoprice;
    let mozeCredits = mozePurchased * bar.mozeprice;
    let vezeCredits = vezePurchased * bar.vezeprice;
    let totalCredits = vemoSpanuCredits + mozeSpanuCredits + vezeSpanuCredits + vemoCredits + mozeCredits + vezeCredits;
    let sweetTotal = vemoSpanuPurchased + mozeSpanuPurchased + vezeSpanuPurchased;
    let popularity = inv.popularity + 5 + sweetTotal;

    let simObject = {
        varkro: varkro,
        ukrel: ukrel,
        ghavik: ghavik,
        vemoPurchased : vemoPurchased,
        mozePurchased : mozePurchased,
        vezePurchased : vezePurchased,
        vemoSpanuPurchased : vemoSpanuPurchased,
        mozeSpanuPurchased : mozeSpanuPurchased,
        vezeSpanuPurchased : vezeSpanuPurchased,
        vemoCredits : vemoCredits,
        mozeCredits : mozeCredits,
        vezeCredits : vezeCredits,
        vemoSpanuCredits: vemoSpanuCredits,
        mozeSpanuCredits : mozeSpanuCredits,
        vezeSpanuCredits: vezeSpanuCredits,
        totalCredits: totalCredits,
        popularity: popularity
    }

    return simObject
}

let buyDrinks = (price, amountLeft, popularity, customers, type) => {
    let amountPurchased = 0;
    let purchaseChance = 30;
    if (type == 'Bitter'){
        if ((popularity >= 75 && price <= 80) || (popularity >= 50 && price <= 65) || (popularity >= 25 && price <= 50) || price <= 40) {
            purchaseChance = 85;
        }
        else if ((popularity >= 75 && price <= 100) || (popularity >= 50 && price <= 85) || (popularity >= 25 && price <= 70) || price <= 60) {
            purchaseChance = 60;
        }
        else if (price >= 100){
            purchaseChance = 0;
        }
    }
    else if (type == 'Sweet'){
        if ((popularity >= 75 && price <= 110) || (popularity >= 50 && price <= 90) || (popularity >= 25 && price <= 75) || price <= 55) {
            purchaseChance = 75;
        }
        else if ((popularity >= 75 && price <= 125) || (popularity >= 50 && price <= 110) || (popularity >= 25 && price <= 90) || price <= 75) {
            purchaseChance = 50;
        }
        else if (price >= 125){
            purchaseChance = 0;
        }
    }
    while (amountLeft > 0 && customers > 0){
        random = Math.floor(Math.random() * 100);
        if (random <= purchaseChance) {
            amountPurchased++;
            amountLeft--;
        }
        customers--;
    }

    return [amountPurchased, customers];
}

module.exports = { simulate }