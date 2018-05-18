import express from "express";
import path from 'path';
import * as WebSocket from 'ws';
import fs from 'fs';
import readline from 'readline';

import Client from './Client';
const server = express();

const socket = new WebSocket.Server({
    port:40512
});

var informations = {};
var messageCount = 0;

socket.on('connection', (socket, request)=>{
    let client = new Client();
    socket.id = client.id;
    informations = require('./informations.json');
    console.log(informations);
    socket.send(socket.id);

    socket.on('message', (message)=>{
        console.log('received: %s', message);
      
    });

    var generateMessage = ()=>{   
        if(!informations.informations[messageCount]){
            console.log('fim json');
            clearInterval(myInterval);
        }
        else{
            socket.send(JSON.stringify(informations.informations[messageCount]));
            messageCount++;
        }
    };
   var myInterval = setInterval(generateMessage, Math.floor(Math.random() * (100 * 60 * 3) - (100 * 60)) ) + (100 * 60)
});


if(process.env.NODE_ENV !== "production"){
    const webpack = require('webpack');
    const config = require("../../config/webpack-dev.js");

    const compiler = webpack(config);//compila o webpack, gerando o frontend

    const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer);
    server.use(webpackDevMiddleware); //usar as configurações de devserver do webpack config
    //process.env.NODE_ENV = "development";
}

const PORT = process.env.PORT || 9001;
server.listen(PORT, ()=>{
    console.log(`Servidor funcionando na porta ${PORT} ${process.env.NODE_ENV}`);
});



