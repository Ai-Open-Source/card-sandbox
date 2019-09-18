const axios = require('axios')
const { encrypt, decrypt, pbkdf2 } = require('./crypt')
const path = require('path')

// Discord

const discord = require('./discord')

discord.init({
	id: process.env.DISCORD_CLIENT_ID,
	secret: process.env.DISCORD_CLIENT_SECRET,
	token: process.env.DISCORD_BOT_TOKEN
})


// Express

const express = require('express')
const app = express()
const token = require('./token')
const bodyParser = require('body-parser')

const Fingerprint = require('express-fingerprint')

app.use(Fingerprint({
	parameters: [
		Fingerprint.useragent,
		Fingerprint.acceptHeaders
	]
}))

app.use(bodyParser.json({
	extended: true
}))

app.use(require('cookie-parser')())


// // Media

// app.use('/media', express.static(path.join(__dirname, 'media')))


// MongoDB / Router

require('./mongo')().then( async mongo => {
    const imports = { 
		mongo, 
		discord, 
		axios, 
		encrypt, 
		decrypt,
		pbkdf2,
		token,
        uuid: require('./uuid'),
        ws: require('./ws')
    }
    
    imports.refresh = require('./refresh')(imports)

    require('./router')({ app }, imports) 

	console.log('API Started')
})

module.exports = app