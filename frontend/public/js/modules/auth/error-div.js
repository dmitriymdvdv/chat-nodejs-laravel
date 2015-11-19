'use strict'

module.exports = ['errorDiv', function(){
    return {
        restrict: 'E',
        require: '^ngModel',
        scope: {
          ngModel: "=",
          messageStr: "@"
        },
        templateUrl: 'error-div.html',
        replace: true,
        transclude: true
    };
}
];