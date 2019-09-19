module.exports = async (req, res, { mongo, refresh }) => {
    const { success, user } = await refresh(req, res)

    if (!success) return res.json({
        code: 400,
        success: false,
        message: 'authentication failed' 
    })

    if (!user.verified) return res.json({
        code: 401,
        success: false,
        message: 'unauthorized'
    })

    const Cards = mongo.collection('cards')

    const cards = user.admin && req.query.archived
        ? await Cards.find({ })
        : await Cards.find({ archived: false })

    return res.json({
        success: true,
        code: 200,
        cards
    })
}