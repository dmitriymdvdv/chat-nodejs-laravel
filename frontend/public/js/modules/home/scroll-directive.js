'use strict';

module.exports = function ($window) {
    return function ($scope, element, attrs) {
        angular.element($window).bind("scroll", function () {
            if (this.pageYOffset >= 100) {
                $scope.boolChangeClass = true;
            } else {
                $scope.boolChangeClass = false;
            }
            $scope.$apply();
        });
    }
};