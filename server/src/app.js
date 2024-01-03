const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

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