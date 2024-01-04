const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const path = require('path');
const server = express();

const adminRouter = require('../src/routes/adminRouter');
const eventsRouter = require('../src/routes/eventsRouter');
const experiencesRouter = require('../src/routes/experiencesRouter');

server.use(cors());
server.use(express.json());

server.use('/admin', teamRouter);
server.use('/events', eventsRouter);
server.use('/experiences', experiencesRouter);

server.use((err, _req, res, _next) => {
    console.log("ERROR: " + err.message);
    res.status(err.code ?? 500);
    res.send({
        status: "Error",
        message: `${err.message}`});
});

server.use((_req, res) => {
    res.status(404);
    res.send("Página no encontrada");
});

module.exports = server;