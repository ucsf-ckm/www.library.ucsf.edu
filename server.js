var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();
server.connection({ port: 80 });

server.route({
	method: '*',
	path: '/',
	handler: {
		file: Path.join(__dirname, 'static', 'index.html')
	}
})

server.route({
	method: '*',
	path: '/{p*}',
	handler: {
		proxy: {
			host: 'www.library.ucsf.edu',
			port: 80,
			passThrough: true,
			xforward: true
		}
	}
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});