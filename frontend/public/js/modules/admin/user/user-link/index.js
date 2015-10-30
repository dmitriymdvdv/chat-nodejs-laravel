'use strict';

module.exports = [function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '='
            },
            template: require('./template.html')
        };
    }
];
