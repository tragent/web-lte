'use strict';

angular.module('webLteApp')
    .factory('DataService', ['$http', '$rootScope', 'fileUpload', function($http, $rootScope, fileUpload){

        $rootScope.BASE_URL = "http://localhost:8080/";

        var DataService = {};
        var config = {
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        };

        DataService.uploadFile = function(file) {
            var fileUploadUrl = $rootScope.BASE_URL + file.name;
            var fd = new FormData();
            fd.append('file', file);

            return $http.post(fileUploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
            //fileUpload.uploadFileToUrl(file, fileUploadUrl);
        };

        DataService.getS1Data = function() {
            var dataUrl = $rootScope.BASE_URL + "s1data";
            return $http.get(dataUrl, config);
        }

        return DataService;
    }]);