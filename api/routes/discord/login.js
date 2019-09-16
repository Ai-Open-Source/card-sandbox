module.exports = async (req, res, { discord }) => {
	res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${
		discord.credentials.id
	}&scope=identify%20email%20guilds&response_type=code&redirect_uri=${
		encodeURIComponent( req.protocol + '://' + req.get('host') + '/auth' )
	}`)
}