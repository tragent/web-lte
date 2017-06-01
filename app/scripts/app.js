'use strict';

/**
 * @ngdoc overview
 * @name webLteApp
 * @description
 * # webLteApp
 *
 * Main module of the application.
 */
angular
  .module('webLteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/signup', {
        templateUrl: 'views/main/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/login', {
        templateUrl: 'views/main/login.html',
        controller: 'LoginCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/archive', {
        templateUrl: 'views/uploadDoc/uploadDoc.html',
        controller: 'UploadDocCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
  .run(function($rootScope, $location){
    $rootScope.location = $location;

    /*Side bar menu acitivator*/
    $rootScope.isActive = function (viewLocation) {
      if ($location.path().search(viewLocation) >= 0) {
        return true;
      }
      return false;
    };
  });
