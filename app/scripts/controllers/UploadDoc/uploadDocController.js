'use strict';

/**
 * @ngdoc function
 * @name webLteApp.controller:UpLoadDocCtrl
 * @description
 * # UpLoadDocCtrl
 * Controller of the webLteApp
 */
angular.module('webLteApp')
  .controller('UploadDocCtrl', ['$scope', 'DataService',
    function($scope, DataService) {
      DataService.uploadFile(file)
        .then(function(response) {
          Materialize.toast('Successfully uploaded file to server', 4000, 'rounded');
        }, function(error){
          Materialize.toast('Error: Failed to upload file. Try Again', 4000, 'rounded');
        });
  }])
  .directive("fileModel",function() {
	return {
		restrict: 'EA',
		scope: {
			setFileData: "&"
		},
		link: function(scope, ele, attrs) {
			ele.on('change', function() {
				scope.$apply(function() {
					var val = ele[0].files[0];
					scope.setFileData({ value: val });
				});
			});
		}
	}
});