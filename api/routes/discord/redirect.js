module.exports = async (req, res, { discord, getURL }) => {
	console.log(discord.credentials)
	res.send(`https://discordapp.com/oauth2/authorize?client_id=${
		discord.credentials.id
	}&scope=identify%20email%20guilds&response_type=code&redirect_uri=${
		encodeURIComponent(req.query.origin + '/discord/code')
	}`)
}