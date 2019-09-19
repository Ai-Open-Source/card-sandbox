module.exports = async (req, res, { mongo, refresh }) => {
    const { success, user } = await refresh(req, res)

    if (!success) return res.json({
        code: 400,
        success: false,
        message: 'authentication failed' 
    })

    if (!user.admin) return res.json({
        code: 401,
        success: false,
        message: 'unauthorized'
    })

    const { uuid, title, tags, archived } = req.body

    const $set = { edited: Date.now() }

    if (title !== undefined) Object.assign($set, { title })
    if (tags !== undefined) Object.assign($set, { tags })
    if (archived !== undefined) Object.assign($set, { archived })

    const Cards = mongo.collection('cards')

    Cards.update({ uuid }, { $set })

    return res.json({
        success: true,
        code: 200
    })
}