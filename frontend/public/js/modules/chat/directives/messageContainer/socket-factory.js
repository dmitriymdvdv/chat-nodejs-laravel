'use strict';

module.exports = [
    '$rootScope',
    function ($rootScope) {
        var socket = io();
        socket.on('connect', function(){ console.log('connect'); });
        socket.on('disconnect', function(){ console.log('disconnect'); });
        
        return {
            on: function (eventName, callback) {
                socket.on(eventName, callback);
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    }
];