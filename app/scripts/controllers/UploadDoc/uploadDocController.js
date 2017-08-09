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
			$scope.errMsg = false;

			$scope.uploadFile = function() {
				$scope.errMsg = false;
				var file = $scope.firstFile;
				var secFile = $scope.secFile;

				if (file == undefined && secFile) {
					files.push(secFile);
				} else if(file && secFile == undefined) {
					files.push(file);
				} else if (file && secFile) {
					Object.assign(files, [file, secFile]);
				} else if(file == undefined && secFile == undefined) { $scope.errMsg = true; }
				
				// upload files to the server
				files.forEach(function(file){
					DataService.uploadFile(file)
						.then(function(response) {
							Materialize.toast('Successfully uploaded file to server', 3000, 'rounded');
						}, function(error){
          		Materialize.toast('Error: Failed to upload file. Try Again', 3000, 'rounded');
						});
				});
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