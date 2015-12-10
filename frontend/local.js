#!/usr/bin/env node
'use strict';

var https = require('https');
var app = require('./server/app');
var fs = require('fs');

var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var currentRoom = {};

app.set('port', process.env.PORT || 3020);
app.set('env', process.env.NODE_ENV || 'local');

var server = http.listen(app.get('port'), function() {
    console.log('phplabs web server listening on port ' + server.address().port);
});

io.on('connection', function(socket){
    var redis = new Redis(6379);

    console.log('user connect', socket.id);

    socket.on('join', function(room) {
        currentRoom[socket.id] = room.chatId;
    });

    redis.subscribe('message-channel');

    redis.on('message', function(channel, message) {
        message = JSON.parse(message);
        if (currentRoom[socket.id] === message['chat_id']) {
            socket.json.send(message);
        }
    });

    socket.on('disconnect', function(){
        console.log('user disconnect', socket.id);
        socket.leave(currentRoom[socket.id]);
        redis.disconnect();
        console.log('user disconnected');
    });
});
