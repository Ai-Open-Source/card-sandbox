const fs = require('fs')
const path = require('path')

module.exports = async (req, res, { mongo}) => {
    console.log(req.file.filename)

    const { tags, title } = req.body

    if ( !(tags && title) ) return res.json({
        code: 400,
        message: 'please provide all required fields',
        success: false
    })

    const uuid = req.file.filename.replace('.png', '')

    const Cards = mongo.collection('cards')

    Cards.insert({
        tags, 
        title, 
        uuid, 
        archived: false,
        date: Date.now()
    })

    return res.json({
        code: 200,
        success: true,
        uuid
    })
}