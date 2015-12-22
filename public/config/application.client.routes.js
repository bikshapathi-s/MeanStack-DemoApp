'use strict';

// Setting up route
angular.module('mean').config(['$routeProvider',
    function ($routeProvider) {
        // Application routing definition
        $routeProvider.
            when('/', {
                templateUrl: 'views/index.html',
                controller: 'IndexController'
            }).
            when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'AuthenticationController'
            }).
            when('/signin', {
                templateUrl: 'views/signin.html',
                controller: 'AuthenticationController'
            }).
            when('/editProfile', {
                templateUrl: 'views/updateUserInfo.html',
                controller: 'AuthenticationController'
            }).
            when('/listUser', {
                templateUrl: 'views/ListUserInfo.html',
                controller: 'AuthenticationController'
            }).
            when('/removeUser', {
                templateUrl: 'views/ListUserInfo.html',
                controller: 'AuthenticationController'
            })
    }
]);