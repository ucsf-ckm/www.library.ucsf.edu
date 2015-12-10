var Hapi = require('hapi');
var Hoek = require('hoek');
var Inert = require('inert');
var Path = require('path');
var Fs = require('fs');


const proxyOptions = function (options) {
    return {
        host: process.env.HOST,
        port: process.env.PORT,
        protocol: 'https',
        redirects: 3,
        passThrough: !!options.passThrough,
        xforward: true
    }
}; 

var server = new Hapi.Server();
server.connection({ port: 8000 });

// Proxy
server.register({register: require('h2o2')}, function (err) {
    if (err) {
        console.log('Failed to load h2o2');
    }
});

// Views
server.register(require('vision'), function (err) {
    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
});

// Static Files
server.register(Inert, function () {});


server.route({
    method: '*',
    path: '/',
    handler: function (request, reply) {
        var uaString = request.headers['user-agent'];
        if (/MSIE [6-8]\./.test(request.headers['user-agent'])) {
            return reply.file(Path.join(__dirname, 'static/ie8.html'));
        }
        reply.view('index');
    },
    config: {
        payload: {
            parse: false
        }
    }
});

server.route({
    method: '*',
    path: '/images/{file}',
    handler: function (request, reply) {
        // This is safe because {file} is only one path element, so it could be
        // .. but not ../.. or ../etc, and we check isFile()
        const fullPath = Path.join(__dirname, '/static/images/', request.params.file);
        Fs.stat(fullPath, function (err, data) {
            if (err || ! data.isFile()) {
                return reply.proxy(proxyOptions({passThrough: false}));
            }
            return reply.file(fullPath);
        });
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
    handler: function (request, reply) {
        // Recent versions of Windows need the Content-type header to render CSS
        if ((request.params.p.slice(-4) === '.css') || (request.params.p.slice(-3) === '.js')) {
            return reply.proxy(proxyOptions({passThrough: true}));
        }
        return reply.proxy(proxyOptions({passThrough: false}));
    },
    config: {
        payload: {
            parse: false
        }
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
