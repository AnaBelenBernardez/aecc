const express = require('express');
const cors = require('cors');
const path = require('path');

const fileupload = require('express-fileupload');
const server = express();

const adminRouter = require('../src/routes/adminRouter');
const eventsRouter = require('../src/routes/eventsRouter');
const experiencesRouter = require('../src/routes/experiencesRouter');
const newsRouter = require('../src/routes/newsRouter');
const faqsRouter = require('../src/routes/faqsRouter');


server.use(cors());
server.use(express.json());
server.use(fileupload());
server.use('/uploads', express.static(path.join(__dirname,'uploads')));

server.use('/admin', adminRouter);
server.use('/events', eventsRouter);
server.use('/experiences', experiencesRouter);
server.use('/news', newsRouter);
server.use('/faqs', faqsRouter);


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