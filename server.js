var Hapi = require('hapi');
var Path = require('path');

const proxyOptions = {
    host: process.env.HOST,
    port: process.env.PORT,
    redirects: 3,
    xforward: true
};

var server = new Hapi.Server();
server.connection({ port: 80 });


server.route({
    method: '*',
    path: '/',
    handler: function (request, reply) {
        var uaString = request.headers['user-agent'];
        if (/MSIE [6-8]\./.test(request.headers['user-agent'])) {
            return reply.file(Path.join(__dirname, 'static/ie8.html'));
        }
        reply.file(Path.join(__dirname, 'static/index.html'));
    },
    config: {
        payload: {
            parse: false
        }
    }
});

server.route({
    method: '*',
    path: '/images/browser_security.png',
    handler: function (request, reply) {
        reply.file(Path.join(__dirname, '/static/images/browser_security.png'));
    },
    config: {
        payload: {
            parse: false
        }
    }
});

server.route({
    method: '*',
    path: '/{p*}',
    handler: { proxy: proxyOptions }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});