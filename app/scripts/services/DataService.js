'use strict';

angular.module('webLteApp')
    .factory('DataService', ['$http', '$rootScope', function($http, $rootScope){

        var url = $rootScope.BASE_URL;

        var DataService = {};
        DataService.uploadFile = function(file) {
            var fd = new FormData();
            fd.append('file', file);

            return $http.post(url, fd, {
                withCredentials: false,
                transformRequest: angular.identity,
                params: { fd },
                responseType: "arraybuffer",
                headers: {'Content-Type': undefined}
            });
        }

        return DataService;
    }]);