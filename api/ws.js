const WebSocket = require('ws')

const server = new WebSocket.Server({ 
    port: process.env.WS_PORT
})

const clients = []

const listeners = []

const on = ( event, callback ) => listeners.push({ event, callback })

const emit = ( event, data, client ) => listeners.filter(
    ( listener ) => listener.event === event
).forEach(
    ({ callback }) => callback( data, client )
)

const messageHandler = ({ event, data }, client) => {
    if ( event ) emit(event, data, client)
}

server.on('connection', client => {
    client.reply = data => client.send( JSON.stringify(data) )

    client.on('message', message => {
        try {
            const parsedMessage = JSON.parse( message )
            messageHandler( parsedMessage, client )
        } catch {
            client.reply({
                event: 'ERROR',
                data: {
                    error: 'malformed-json'
                }
            })
        }
    })
})

const broadcast = ({ event, data }) => {
    for (const client of clients) {
        client.reply({ event, data })
    }
}

module.exports = {
    broadcast,
    on,
}