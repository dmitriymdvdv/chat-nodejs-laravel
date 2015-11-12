'use strict';

module.exports = [
    '$scope',
    function ($scope) {

        $scope.interval = 3000;

        $scope.slides = [
            {
                image: '/img/asd-7.jpg',
                msg: 'Text with img1'
            },
            {
                image: '/img/Favim.ru-2352319.jpg',
                msg: 'Text with img2'
            },
            {
                image: '/img/missing_artwork___put_this_one_600x600_px__psd__by_mozainuddin-d6k3qu3.jpg',
                msg: 'Text with img3'
            }
        ];

    }
];
