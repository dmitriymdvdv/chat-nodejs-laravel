'use strict';

module.exports = [
    '$modal',
    function ($modal) {

        this.openNewChatModal = function (params) {
            var $modalInstance;

            $modalInstance = $modal.open({
                template: require('./new-chat/template.html'),
                controller: 'NewModalController',
                resolve: {
                    data: function () {
                        return params.chat ? {
                            chat: params.chat
                        }
                            : {
                            typeOfChat: params.isPrivate
                        }

                    }
                }
            });
        }
    }
];
