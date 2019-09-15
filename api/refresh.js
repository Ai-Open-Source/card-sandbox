module.exports = ({ encrypt, decrypt, discord, mongo, token }) => async (req, res) => {
	if (!token.get(req)) return {
		status: 401,
		message: 'unauthorized',
		success: false
	}

	const { id } = token.get(req)
	const {query: { origin }, fingerprint} = req

	try {
		const Sessions = mongo.collection('sessions')
		const Users = mongo.collection('users')

		const { ciphertext, salt } = (
			await Sessions.find({
				fingerprint: fingerprint.hash,
				id
			})
		)[0]

		const {token: {refresh_token, access_token}, user} = await discord.refresh( {
			refresh_token: decrypt(ciphertext, token.get(req).access_token, salt), 
			redirect_uri: encodeURIComponent(origin)
		})

		if (user.id !== id) return {
			status: 404,
			message: 'user not found',
			success: false
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
			id,
			access_token
		})

		const {
			created_at, 
			last_signed_in, 
			admin, 
			freelancer
		} = (await Users.find({ id }))[0]

		return {
			status: 200,
			user: Object.assign({}, user, { 
				created_at, 
				last_signed_in, 
				admin, 
				freelancer 
			}),
			success: true
		}
	} catch (error) {
		return {
			status: 404,
			message: 'user not found',
			success: false
		}
	}
}