/**
 * Created by bsamudrala on 09-12-2015.
 */
'use strict';

// Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        // Application routing definition
        $routeProvider.
            when('/auth/apply', {
                templateUrl: 'views/index.html',
                controller: 'LeaveController'
            }).
            when('/auth/edit', {
                templateUrl: 'views/editLeave.html',
                controller: 'LeaveController'
            }).
            when('/auth/getData', {
                templateUrl: 'views/listLeaves.html',
                controller: 'LeaveController'
            }).
            when('/auth/deleteLeave', {
                templateUrl: 'views/index.html',
                controller: 'LeaveController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);