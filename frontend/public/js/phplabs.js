'use strict';

var domready = require('domready');
var angular = require('angular');

//require common modules
require('./common/ita-embedded-data');
require('./common/ita-request');
require('./common/ita-loading');
require('./common/directives');

//require project modules
require('./modules/home');
require('./modules/auth');
require('./modules/chat');
require('./modules/user');

var initInject = angular.injector(['ng']);
var $http = initInject.get('$http');

$http.get('./js/fakeJson.json').then(function (response) {
    domready(function () {
        angular
            .module('PHPLabs', [
                'ui.router',
                'ui.bootstrap',
                'ui.select',
                'picardy.fontawesome',


                'ITA.EmbeddedData',
                'ITA.Request',
                'ITA.Loading',
                'Common.Directive',

                'Home',
                'Auth',
                'Chat',
                'User'
            ])
            .config([
                'itaEmbeddedDataServiceProvider',
                'itaRequestServiceProvider',
                '$urlRouterProvider',
                'authServiceProvider',
                function (itaEmbeddedDataServiceProvider, itaRequestServiceProvider, $urlRouterProvider, authServiceProvider) {
                    itaEmbeddedDataServiceProvider.init(window.embeddedData);
                    itaRequestServiceProvider.baseUrl(window.embeddedData.api.url);

                    $urlRouterProvider.otherwise('/');

                    authServiceProvider.authData = response.data;


                }
            ]);
            //.run(require('./app-run'));

        angular.bootstrap(document, ['PHPLabs']);

    });
});