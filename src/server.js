const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notes = require('./api/notes');
const NotesServices = require('./service/inMemory/NotesService');

const init = async () => {
    const notesService = new NotesServices();

    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // server.route(routes);

    await server.register({
        plugin: notes,
        options: {
            service: notesService,
        }
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
