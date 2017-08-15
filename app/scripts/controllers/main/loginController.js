'use strict';

/**
 * @ngdoc function
 * @name webLteApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webLteApp
 */
angular.module('webLteApp')
	.controller('LoginCtrl', [ '$scope', '$rootScope', '$location', 'AuthService', '$cookieStore',
	function ($scope, $rootScope, $location, AuthService, $cookieStore) {

		(function initController() {
      AuthService.clearCredentials();
      $scope.username = "";
      $scope.password = "";
    })();

  	$scope.login = function(){
			console.log("submitted");
			$rootScope.username = $scope.username;
			$rootScope.password = $scope.password;
			// $location.path('/dashboard');

			AuthService.login($scope.username, $scope.password)
				.then(function(response) {
					var usr = {
						username: $scope.username,
						password: $scope.password
					};
					console.log(response.data.firstName);
					$cookieStore.put("user", usr);
					$location.path('/dashboard');
				}, function(error){
					console.log("Error logging in user");
				})
  	}

  }]);