/**
 * Created by bsamudrala on 09-12-2015.
 */
'use strict';

angular.module('mean').controller('LeaveController', ['$scope', '$http', '$location', 'Authentication',
    function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;
        var isedited=false;
        //If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');
        $scope.applyLeave = function() {
            $http.post('/auth/apply', $scope.leave).success(function(response) {
                $scope.authentication.listofleaves = response;
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
        $scope.getData = function() {
            $http.get('/auth/getData').success(function(response) {
                //And redirect to the index page
                $scope.authentication.listofleaves = response;
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.edit = function(id) {
            $http.put('/auth/edit/'+id).success(function(response) {
                $scope.leave = response[0];
                var fromdateformat = new Date(response[0].fromDate);
                var todateformat = new Date(response[0].toDate);
                //var dateformat = require('dateformat');
                var dat1=fromdateformat.getDate();
                if(fromdateformat.getDate()<10){
                    dat1 = "0"+dat1;
                }
                var dat2=todateformat.getDate();
                if(todateformat.getDate()<10){
                    dat2 = "0"+dat2;
                }
                $scope.leave.fromDate = fromdateformat.getFullYear()+"-"+(fromdateformat.getMonth()+1)+"-"+dat1;
                $scope.leave.toDate = todateformat.getFullYear()+"-"+(todateformat.getMonth()+1)+"-"+dat2;
                $scope.leave.isedited=(!isedited);
                $scope.leave.leaveType.type = "Casual-Sick Leave";
                $scope.leave.approval = "ashok";
                $scope.leave.alternateApprover = "deep";


                //If successful we assign the response to the global user model
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.deleteLeave = function(id) {
            $http.delete('/auth/deleteLeave/'+id).success(function(response) {
                $scope.authentication.listofleaves = response;
                //And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);