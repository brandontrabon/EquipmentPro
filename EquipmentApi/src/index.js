'use strict';

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

server.on('listening', function() {
    console.log(`Feathers application started on ${app.get('host')}:${port}`);
});
