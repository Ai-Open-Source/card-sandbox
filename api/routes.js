const multer = require('multer')
const uuid = require('./uuid')

module.exports = {
	'get discord/code': 'discord/code',
	'get discord/login': 'discord/login',
	'get discord/users/:id': 'discord/users',
    'get discord/refresh': 'discord/refresh',
    'post cards/upload': {
        route: 'cards/upload',

        // TODO: ifexists ~/media/

        middleware: multer({ 
            storage: multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, 'media/')
                },

                filename ( req, file, callback ) {
                    callback(null, uuid() + '.png')
                }
            })
        }).single('source')
    }
}