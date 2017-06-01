'use strict';

/**
 * @ngdoc function
 * @name webLteApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webLteApp
 */
angular.module('webLteApp')
  .controller('LoginCtrl', [ '$scope', '$location', function (scope, location) {

  	scope.login = function(){
  		// Login User function
  		console.log("Login in user");
  		location.path('/dashboard');
  	}

  }]);