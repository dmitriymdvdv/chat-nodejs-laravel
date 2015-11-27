'use strict';
 module.exports = [function(){
  var REGEXE = (/^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/i);
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