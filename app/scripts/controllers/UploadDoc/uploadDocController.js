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
			var files = [];

			$scope.uploadFile = function() {
				var file = $scope.firstFile;
				var secFile = $scope.secFile;
			
				Object.assign(files, [file, secFile]);

				// upload files to the server
				for(file in files) {
					DataService.uploadFile(file)
						.then(function(response) {
							Materialize.toast('Successfully uploaded file to server', 3000, 'rounded');
						}, function(error){
          		Materialize.toast('Error: Failed to upload file. Try Again', 3000, 'rounded');
						});
				}
			}
	}])
	.directive('fileModel', ['$parse', function($parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				element.bind('change', function() {
					scope.$apply(function(){
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};
	}]);