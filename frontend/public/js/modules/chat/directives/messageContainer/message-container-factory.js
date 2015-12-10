'use strict';

module.exports = [
    '$q',
    '$http',
    'appSettings',
    function ($q, $http, appSettings) {
        return {

            sendMessage: function (params) {

                return $http({
                    method: 'POST',
                    url: appSettings.apiUrl + 'message',
                    params: params
                })

            },

            getMessages : function(params){

                return $http({
                    method: 'GET',
                    url: appSettings.apiUrl + 'message',
                    params: params
                });

            }
        }
    }
];