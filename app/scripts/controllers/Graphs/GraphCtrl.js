'use strict';

/**
 * @ngdoc function
 * @name webLteApp.controller:GraphCtrl
 * @description
 * # GraphCtrl
 * Controller of the webLteApp
 */
angular.module('webLteApp')
  .controller('GraphCtrl', [ '$scope', '$location', function ($scope, $location) {
      
      $(document).ready(function() {
        $('.timepicker').pickatime({
          default: 'now', 
          fromnow: 0,       
          twelvehour: false, 
          donetext: 'OK', 
          cleartext: 'Clear', 
          canceltext: 'Cancel', 
          autoclose: false, 
          ampmclickable: true, 
          aftershow: function(){} 
        }); 
      });

      $('.datepicker').pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15, // Creates a dropdown of 15 years to control year,
          today: 'Today',
          clear: 'Clear',
          close: 'Ok',
          closeOnSelect: false // Close upon selecting a date,
        });

      $scope.runAnalysis = function() {
        console.log("Start Date: " + $scope.startDate);
        // TODO: Run analysis using DataService here
      }

      $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
      $scope.series = ['Series A', 'Series B'];
      $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      $scope.onClick = function (points, evt) {
        console.log(points, evt);
      };
      $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
      $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        }
      };
  }]);