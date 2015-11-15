'use strict';

module.exports = [function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            otherModelValue: "=compareTo",
        },
        link: function(scope, element, attr, ngModel){
            ngModel.$validators.compareTo = function(modelValue){

                return modelValue === scope.otherModelValue;
            };
            scope.$watch("otherModelValue", function(){
                ngModel.$validate();
            });
        }
    };
}];
