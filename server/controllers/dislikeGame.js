const {
    mysql
} = require('../qcloud')


let dislikeGame = async ctx => {
    let gameid = Number(ctx.query.id)
    let games = await mysql('games')
        .where('id', '=', gameid)
        .increment('dislikeCount', 1)
    ctx.state.data = gameid
}

module.exports = dislikeGame