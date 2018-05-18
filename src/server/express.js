import express from "express";
import path from 'path';
import * as WebSocket from 'ws';

const ws = new WebSocket.Server({port:40512});
ws.on('connection', (ws)=>{
    ws.on('message', (message)=>{
        console.log('received: %s', message);
    });

    setInterval(
        () => ws.send(`${new Date()}`),
    1000)
});

const server = express();

if(process.env.NODE_ENV !== "production"){
    const webpack = require('webpack');
    const config = require("../../config/webpack-dev.js");
    const compiler = webpack(config);

    const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer);
    server.use(webpackDevMiddleware); //usar as configurações de devserver do webpack config
    process.env.NODE_ENV = "development";
}

const PORT = process.env.PORT || 9001;
server.listen(PORT, ()=>{
    console.log(`Servidor funcionando na porta ${PORT} ${process.env.NODE_ENV}`);
});


