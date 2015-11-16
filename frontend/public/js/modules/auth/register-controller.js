'use strict';

module.exports = function(){
    RegisterController.$inject =[
        '$scope',
        'authService',
        '$http'
    ];

    function RegisterController($scope, authService, $http) {

        var loadUserData = function(){
            $scope.authData = authService.getIdentity();
        };

        loadUserData();

        var registration = function(authData){

            //request
            $http.post('http://slack/dev')
                .success(function(data, status, headers, config){

            }).error(function(data, status, headers, config){

            });
            //set identity data
            authService.setIdentity(authData);
        };

    }
    return RegisterController;
};
