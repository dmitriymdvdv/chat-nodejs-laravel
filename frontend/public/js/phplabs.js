'use strict';

var domready = require('domready');
var angular = require('angular');

//require common modules
require('./common/ita-embedded-data');
require('./common/ita-request');
require('./common/ita-loading');

//require project modules
require('./modules/home');
require('./modules/admin');

domready(function () {
    angular
        .module('PHPLabs', [
            'ui.router',
            'ui.bootstrap',

            'ITA.EmbeddedData',
            'ITA.Request',
            'ITA.Loading',

            'Home',
            'Admin'
        ])
        .config([
            'itaEmbeddedDataServiceProvider',
            'itaRequestServiceProvider',
            '$urlRouterProvider',
            function(itaEmbeddedDataServiceProvider, itaRequestServiceProvider, $urlRouterProvider) {
                itaEmbeddedDataServiceProvider.init(window.embeddedData);
                itaRequestServiceProvider.baseUrl(window.embeddedData.api.url);

                $urlRouterProvider.otherwise('/');
            }
        ]);

    angular.bootstrap(document, ['PHPLabs']);
});