const Hapi = require('@hapi/hapi')

const server = Hapi.server({
    port:3000,
    host:'localhost'
})

server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) =>{
        return 'heelo hapi worudo'
    }
})

//route authentication

server.start();
console.log('Server running on %s', server.info.uri)
