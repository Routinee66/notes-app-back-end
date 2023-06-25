require('dotenv').config();

const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notes = require('./api/notes');
// const NotesServices = require('./service/inMemory/NotesService');
const NotesServices = require('./service/postgres/NotesService');
const NotesValidator = require('./validator/notes');

const init = async () => {
    const notesService = new NotesServices();

    const server = Hapi.server({
        port: process.env.PORT,
        // host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        host: process.env.HOST,
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
            validator: NotesValidator,
        },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();