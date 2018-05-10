const {
    mysql
} = require('../qcloud')


let likeGame = async ctx => {
    let gameid = Number(ctx.query.id)
    let openid = ctx.query.openId

    let user = await mysql('cSessionInfo').where('open_id', openid)
    let userdislikegames = JSON.parse(user[0].dislikeGame)
    let userlikegames = JSON.parse(user[0].likeGame)



    if (userlikegames.includes(gameid)) {
        //已经存在返回提示
        ctx.state.data = '已经点击过了'
    } else {
        //喜欢加一
        await mysql('games')
            .where('id', '=', gameid)
            .increment('likeCount', 1)
        //不喜欢减一
        await mysql('games')
            .where('id', '=', gameid)
            .decrement('dislikeCount', 1)

        //添加到喜欢列表
        userlikegames.push(gameid)

        //如果不喜欢列表中存在则去掉
        userdislikegames = userdislikegames.filter(i => i !== gameid)

        await mysql('cSessionInfo')
            .where('open_id', openid)
            .update({
                dislikeGame: JSON.stringify(userdislikegames),
                likeGame: JSON.stringify(userlikegames)
            })

        ctx.state.data = true
    }


}

module.exports = likeGame