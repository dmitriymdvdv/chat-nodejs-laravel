'use strict';

module.exports = [function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            otherModelValue: "=equalTo",
        },
        link: function(scope, element, attr, ngModel){
            ngModel.$validators.equalTo = function(modelValue){

                return modelValue === scope.otherModelValue;
            };
            scope.$watch("otherModelValue", function(){
                ngModel.$validate();
            });
        }
    };
}];