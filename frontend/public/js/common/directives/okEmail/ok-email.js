'use strict';
 module.exports = [function(){
  var REGEXE = (/^\w+[\.\w|\S\w]+@[a-z]+\.[a-z]+$/i);
     return {
         restrict: 'A',
         require: 'ngModel',
         scope: true,
         link: function(scope, element, attr, ngModel){
             ngModel.$validators.okEmail = function(value){
                 return REGEXE.test(value);
             };
         }
     };
 }];