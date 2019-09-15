module.exports = async ( { query, fingerprint }, res, { discord, mongo, encrypt, token } ) => {
	const response = await discord.code({
		code: query.code,
		redirect_uri: encodeURIComponent(query.origin + '/discord/code')
	})

	console.log(response)

	const { 
		user: { id }, 
		token: { refresh_token, access_token } 
	} = response

	const Users = mongo.collection('users')
	const Sessions = mongo.collection('sessions')

	let currentUser = await Users.find({id})

	if (currentUser.length === 0) {
		currentUser = {
			created_at: Date.now(),
			last_signed_in: Date.now(),
			id,
			admin: false,
			freelancer: false,
		}

		await Users.insert(currentUser)
	}

	await Sessions.remove({
		fingerprint: fingerprint.hash
	})

	await Sessions.insert({
		fingerprint: fingerprint.hash, 
		...encrypt(refresh_token, access_token),
        id,
        date: Date.now()
	})
	
	token.set(res, {
		access_token,
		id
	})

	res.json({ success: true, status: 200 })
}