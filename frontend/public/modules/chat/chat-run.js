'use strict';

module.exports = function () {
    $rootScope.$on("$stateChangeStart", function(event, next, current) {
        if(next.requireLogin) {
            event.preventDefault();
        }
    });
};
