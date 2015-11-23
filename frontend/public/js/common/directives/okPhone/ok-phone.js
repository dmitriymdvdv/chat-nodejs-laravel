'use strict';

module.exports = [function() {
    var REGEXE = (/^[+.\d|\d]?[\d{2}]?[- .]?(\(\d{2}|\d{3}\)|(\d{2}|\d{3}))[- .]?\d{3}[- .]?\d{4}|\d{2}[- .]?\d{2}$/);
 return {
     restrict: 'A',
     require: 'ngModel',
     scope: true,
     link: function(scope, element, attr, ngModel){
        ngModel.$validators.okPhone = function(value){
            return REGEXE.test(value);
        };
     }
 };
}];