'use strict';

/**
 * @ngdoc function
 * @name webLteApp.controller:GraphCtrl
 * @description
 * # GraphCtrl
 * Controller of the webLteApp
 */
angular.module('webLteApp')
  .controller('GraphCtrl', [ '$scope', '$location', 'DataService', 
  function ($scope, $location, DataService) {

      // initial data loading
      $(document).ready(function(){
        $scope.loadData();
        $('.scrollspy').scrollSpy();
      });

      // variables
      $scope.avBN = []; $scope.mdBN = []; $scope.avDN = [];
      $scope.avPDN = []; $scope.maxPDN = []; $scope.dwn = [];
      $scope.avAU = []; $scope.maxAU = []; $scope.ip = []; 
      $scope.saeReq = []; $scope.saeSuc = []; $scope.up = [];
      $scope.realPDN = []; $scope.realU = []; $scope.realI = [];
      $scope.realC = []; $scope.maxU = []; $scope.maxUi = [];
      $scope.serviceReq = []; $scope.serviceSuc = []; $scope.pageReq = [];
      $scope.pageSuc = [];

      $scope.loadData = function() {
        // get all the data - probably paginate this if there is the possibilty of more data
        DataService.getS1Data()
          .then(function(response) {
            var data = response.data;
            var labels = [];
            data.forEach(function(datum) {
              labels.push(datum.startTime);
              $scope.avBN.push(datum.averageBearerNumber);
              $scope.mdBN.push(datum.maximumBearerNumber);
              $scope.avDN.push(datum.averageDedicatedBearerNumber);

              $scope.avPDN.push(datum.averagePdnConnectionNumber);
              $scope.maxPDN.push(datum.maximumPdnConnectionNumber);

              $scope.avAU.push(datum.averageAttachedUsers);
              $scope.maxAU.push(datum.maximumAttachedUsers);

              $scope.ip.push(datum.ipPacketsReceived);
              $scope.dwn.push(datum.downlinkMessageKbytesSentInterface);

              $scope.saeReq.push(datum.saeBearerSetupRequestTimes);
              $scope.saeSuc.push(datum.saeBearerSetupSuccessTimes);

              $scope.realPDN.push(datum.realTimePdnConnectionNumber);
              $scope.up.push(datum.uplinkMessageKbytesReceivedInterface);

              $scope.realU.push(datum.realTimeAttachedUsers);
              $scope.realI.push(datum.realTimeAttachedUsersAtEcmidleStatus);
              $scope.realC.push(datum.realTimeAttachedUsersAtEcmconnectedStatus);

              $scope.maxU.push(datum.maximumAttachedUsersAtEcmconnectedStatus);
              $scope.maxUi.push(datum.maximumAttachedUsersAtEcmidleStatus);

              $scope.serviceSuc.push(datum.serviceRequestSuccessTimes);
              $scope.serviceReq.push(datum.serviceRequestTimes);

              $scope.pageReq.push(datum.pagingRequestTimes);
              $scope.pageSuc.push(datum.pagingSuccessTimes);
            });

            // plot graphs
            $scope.plotS1Graph(labels, $scope.avBN, $scope.mdBN, $scope.avDN);
            $scope.plotPDNGraph(labels, $scope.avPDN, $scope.maxPDN);
            $scope.plotUsersGraph(labels, $scope.avAU, $scope.maxAU);
            $scope.plotIpGraph(labels, $scope.ip);
            $scope.plotDwnGraph(labels, $scope.dwn);
            $scope.plotSaeGraph(labels, $scope.saeReq, $scope.saeSuc);
            $scope.plotUpGraph(labels, $scope.up);
            $scope.plotRealTimePdn(labels, $scope.realPDN);
            $scope.plotRealTimeUsersGraph(labels, $scope.realU, $scope.realI, $scope.realC);
            $scope.plotMaxUsersGraph(labels, $scope.maxU, $scope.maxUi);
            $scope.plotServiceGraph(labels, $scope.serviceReq, $scope.serviceSuc);
            $scope.plotPagingGraph(labels, $scope.pageReq, $scope.pageSuc);

          }, function(error) { });
      }

      $scope.plotS1Graph = function(labels, avBN, mdBN, avDN) {
        $scope.labels = labels; $scope.series = ['S1 mode average bearer number', 'S1 mode max bearer number', 'Average dedicated bearer number']; $scope.data = [avBN, mdBN, avDN];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.colors = [ '#803690', '#00ADF9', '#FDB45C', '#46BFBD', '#949FB1', '#4D5360'];
        $scope.options = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      }

      $scope.plotPDNGraph = function(labels, avPDN, maxPDN) {
        $scope.pdnLabels = labels; $scope.pdnSeries = ['S1 mode average bearer number', 'S1 mode max bearer number', 'Average dedicated bearer number']; $scope.pdnData = [avPDN, maxPDN];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.pdnColors = [ '#803690', '#00ADF9', '#FDB45C', '#46BFBD', '#949FB1', '#4D5360'];
        $scope.pdnOptions = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      }

      $scope.plotUsersGraph = function(labels, avUsers, maxUsers) {
        $scope.usersLabels = labels; $scope.usersSeries = ['Average Attached Users', 'Maximum Attached Users']; $scope.usersData = [avUsers, maxUsers];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.usersColors = [ '#803690', '#00ADF9', '#FDB45C', '#46BFBD', '#949FB1', '#4D5360'];
        $scope.usersOptions = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      };

      $scope.plotIpGraph = function(labels, ip) {
        $scope.ipLabels = labels; $scope.ipSeries = ['IP Packets receieved']; $scope.ipData = [ip];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.ipColors = [ '#803690', '#00ADF9', '#FDB45C', '#46BFBD', '#949FB1', '#4D5360'];
        $scope.ipOptions = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      };

      $scope.plotDwnGraph = function(labels, dwn) {
        $scope.dwnLabels = labels; $scope.dwnSeries = ['Downlink message in kbytes in S1 interface']; $scope.dwnData = [dwn];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.dwnColors = [ '#4D5360', '#00ADF9', '#FDB45C', '#46BFBD', '#949FB1'];
        $scope.dwnOptions = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      }

      $scope.plotSaeGraph = function(labels, saeReq, saeSuc) {
        $scope.saeLabels = labels; $scope.saeSeries = ['SAE bearer setup request times', 'SAE bearer setup success times']; $scope.saeData = [saeReq, saeSuc];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.saeColors = [ '#4D5360', '#00ADF9', '#FDB45C', '#46BFBD', '#949FB1'];
        $scope.saeOptions = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      }

      $scope.plotUpGraph = function(labels, up) {
        $scope.upLabels = labels; $scope.upSeries = ['Uplink message in kbytes in S1 interface']; $scope.upData = [up];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.upColors = [ '#949FB1', '#00ADF9', '#FDB45C', '#46BFBD', ];
        $scope.upOptions = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      }

      $scope.plotRealTimePdn = function(labels, realPdn) {
        $scope.realLabels = labels; $scope.realSeries = ['Real Time PDN Connection number']; $scope.realData = [realPdn];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.realColors = [ '#FF8FAF', '#00ADF9', '#FDB45C', '#46BFBD', ];
        $scope.realOptions = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      } 

      $scope.plotRealTimeUsersGraph = function(labels, realU, realC, realI) {
        $scope.realULabels = labels; $scope.realUSeries = ['Real Time Attached Users', 'Real Time Attached Users at Connection', 'Real Time Attached Users at Idle']; $scope.realUData = [realU, realC, realI];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.realUColors = [ '#FF8FAF', '#46BFBD', '#FDB45C',  ];
        $scope.realUOptions = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      } 

      $scope.plotMaxUsersGraph = function(labels, maxU, maxI) {
        $scope.maxULabels = labels; $scope.maxUSeries = ['Maximum Attached Users', 'Maximum Attached Users at Idle Status']; $scope.maxUData = [maxU, maxI];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.maxUColors = [ '#FDB45C', '#FF8FAF', '#46BFBD',   ];
        $scope.maxUOptions = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      }

      $scope.plotServiceGraph = function(labels, serviceReq, serviceSuc) {
        $scope.serviceLabels = labels; $scope.serviceSeries = ['Service Request Times', 'Service Request Success Times']; $scope.serviceData = [serviceReq, serviceSuc];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.serviceColors = [ '#2DC72D', '#c72dc7'];
        $scope.serviceOptions = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      }

      $scope.plotPagingGraph = function(labels, pageReq, pageSuc) {
        $scope.pagingLabels = labels; $scope.pagingSeries = ['Paging Request Times', 'Paging Request Success Times', 'Real Time Attached Users at Idle']; $scope.pagingData = [pageReq, pageSuc];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.pagingColors = [ '#291810', '#102129'];
        $scope.pagingOptions = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              }
            ]
          }
        };
      }
  }]);