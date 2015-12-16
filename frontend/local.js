#!/usr/bin/env node
'use strict';

var https = require('https');
var app = require('./server/app');
var fs = require('fs');

var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var currentRoom = {};
var currentUserName = {};
var sideBarChatsId = [];

app.set('port', process.env.PORT || 3020);
app.set('env', process.env.NODE_ENV || 'local');

var server = http.listen(app.get('port'), function() {
    console.log('phplabs web server listening on port ' + server.address().port);
});

io.on('connection', function(socket){
    var redis = new Redis(6379);

    socket.on('join', function(data) {
        socket.join(data.chatId);
        currentRoom[socket.id] = data.chatId;
        currentUserName[socket.id] = data.userName;
    });

    socket.on('join-to-all', function (rooms) {
        sideBarChatsId = rooms;
    });

    redis.subscribe('message-channel');

    redis.on('message', function (channel, message) {

        message = JSON.parse(message);

        if (idExists(message['chat_id'])) {
            socket.emit('notify', Number(message['chat_id']));
        }

        if (currentRoom[socket.id] === message['chat_id']) {
            socket.json.send(message);
        }
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit("isTyping", {
            isTyping: data,
            person: currentUserName[socket.id]
        });
    });

    socket.on('disconnect', function () {
        socket.leave(currentRoom[socket.id]);
        redis.disconnect();
    });

    function idExists(currentChat) {
        for (var i = 0; i < sideBarChatsId.length; i++) {
            if (sideBarChatsId[i] == Number(currentChat)) {
                return true;
            }
        }
        return false;
    }
});
