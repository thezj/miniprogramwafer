const { mysql } = require('../qcloud')


let getgame = async ctx =>{
    let games = await mysql.select().table('games')
    ctx.state.data = games
}

module.exports = getgame