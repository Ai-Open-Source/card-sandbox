module.exports = (req, res, { mongo, refresh }) => {
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

    const { uuid } = req.body

    const Cards = mongo.collection('cards')

    Cards.remove({ uuid })

    return res.json({
        success: true,
        code: 200
    })
}