const {
    mysql
} = require('../qcloud')


let likeGame = async ctx => {
    let gameid = Number(ctx.query.id)
    let games = await mysql('games')
        .where('id', '=', gameid)
        .increment('likeCount', 1)
    ctx.state.data = gameid
}

module.exports = likeGame