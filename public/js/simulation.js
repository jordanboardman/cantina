let simulate = (inv, bar) => {
    let varkroBonus = 0;
    let ukrelBonus = 0;
    let ghavikBonus = 0;
    if (inv.weather == 'Hot'){
    varkroBonus = 10
    }
    else if (inv.weather == 'Average'){
    ukrelBonus = 10
    }
    else if (inv.weather == 'Cold'){
    ghavikBonus = 10
    }

    let varkro = Math.floor(Math.random * 20) + Math.floor(Math.random * inv.popularity) + varkroBonus;
    let ukrel = Math.floor(Math.random * 20) + Math.floor(Math.random * inv.popularity) + ukrelBonus;
    let ghavik = Math.floor(Math.random * 20) + Math.floor(Math.random * inv.popularity) + ghavikBonus;
}

export { simulate }