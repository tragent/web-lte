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
    'ngTouch',
    'chart.js'
  ])
  .config(function ($routeProvider, ChartJsProvider) {
    (function (ChartJsProvider) {
      ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
    }); 
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
      .when('/analysis', {
        templateUrl: 'views/analysis/analysis.html',
        controller: 'AnalysisCtrl'
      })
      .when('/graphs', {
        templateUrl: 'views/graphs/graphs.html',
        controller: 'GraphCtrl'
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
