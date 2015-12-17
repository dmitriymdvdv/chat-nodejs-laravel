'use strict';

ProfileController.$inject = [
    '$scope',
    '$state',
    'authService',
    'UserFactory',
    'ChatFactory'
];

function ProfileController($scope, $state, authService, UserFactory, ChatFactory) {
    $scope.userData = authService.getIdentity();
    console.log($scope.userData);

    var userId = angular.copy(ChatFactory
                    .getUsers({
                        query: ''
                    })
                    .then(function(response){
                        $scope.users = response.data;
                    })['id']
    );
        if($scope.userData.id === userId) {
            $scope.your = true;
        } else{
            $scope.your = false;
        }
    $scope.destroy = function(){
        UserFactory.destroy()
            .then(function(data){},
                    function(error){
                        $scope.error = error.data['error_message'];
                    });
    };
    $scope.edit = function(){
        $state.go('edit');
    };
}

module.exports = ProfileController;