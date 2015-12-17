'use strict';

EditProfileController.$inject = [
    '$scope',
    'authService',
    'UserFactory',
    'Upload',
    'appSettings',
    'md5'
];

function EditProfileController($scope, authService, UserFactory, Upload, appSettings, md5) {

    $scope.userData = authService.getIdentity();

    $scope.updateData = function (userData) {

        var dotIndex = userData.avatar_url.name.lastIndexOf('.');
        var ext = userData.avatar_url.name.substring(dotIndex);
        userData.file = {
            name: md5.createHash(name).slice(0, 10),
            path: transformToUrl(userData.avatar_url.name),
            ext: ext
        };
        userData.avatar_url = 'api/public/images/avatars/'
            + userData.file.path
            + userData.file.name
            + userData.file.ext;

        UserFactory.update(userData)
            .then(function (data) {},
                function (error) {
                $scope.error = error.data['error_message'];
            });
    };

    $scope.uploadAvatar = function (userData) {
        var file = userData.avatar_url;
        file.upload = Upload.upload({
            url: appSettings.apiUrl + 'user/edit',
            data: {
                file: file
            }
        });
    };

    var transformToUrl = function (name) {
        var hashName = md5.createHash(name);
        var str = hashName.slice(0, 10);
        var route = '';
        for (var i = 0; i < 10; i++) {
            route += str[i];
            if (i % 2 != 0) {
                route += '/';
            }
        }
        return route;
    };
}

module.exports = EditProfileController;