'use strict';

angular.module('mean').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
    function ($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;
        if(!$scope.userlist) {
            $scope.userlist = [];
        }
        //If user is signed in then redirect back home
        // if ($scope.authentication.user) $location.path('/');

        $scope.signup = function () {
            $http.post('/auth/signup', $scope.credentials).success(function (response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;

                //And redirect to the index page
                $location.path('/');
            }).error(function (response) {
                $scope.error = response.message;
            });
        };

        $scope.signin = function () {
            $http.post('/auth/signin', $scope.credentials).success(function (response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;
                $http.get('/auth/getData').success(function(response) {
                    //And redirect to the index page
                    $scope.authentication.listofleaves = response;
                    $location.path('/');
                }).error(function(response) {
                    $scope.error = response.message;
                });

                //And redirect to the index page
                $location.path('/');
            }).error(function (response) {
                $scope.error = response.message;
            });
        };
        $scope.editUserProfile1 = function () {
            $scope.authentication.editedUser=undefined;
            $location.path('/editProfile/');
        };
        $scope.getUserById = function(id){
            $http.get('/auth/getUserInfo/'+id).success(function(res){
                $scope.authentication.editedUser = res;
                $location.path('/editProfile/');
            }).error(function(res){$scope.error = response.message;});
        };
        $scope.editUserProfile = function () {
            var user =  $scope.authentication.user;
            if($scope.authentication.editedUser){
                user = $scope.authentication.editedUser;
            }
            $http.put('/auth/editProfile', user).success(function (res) {
                $scope.authentication.user = response;
                $location.path('/');
            }).error(function (response) {
                $scope.error = response.message;
            });
        };
        $scope.getUsersInfo = function () {
            $http.get('/auth/getUsers').success(function (res) {
                $scope.authentication.userlist = res;
                if(!$scope.authentication.userlist){
                    $scope.authentication.user=undefined;
                    $location.path('/#!/signout/');
                }else {
                    $location.path('/listUser');
                }
            }).error(function (res) {
                $scope.error = res.message;
            });

        };
        $scope.deleteUsersInfo = function (id) {
            var path='/listUser';
            var istrue=false;
            if( $scope.authentication.user._id ==id){
                istrue=true;
                //path='/#!/signout/'
            }
            $http.delete('/auth/removeUsers/'+id).success(function (res) {
                $scope.authentication.userlist = res;
                if(istrue){
                    $scope.authentication.user=undefined;
                }
                $location.path(path);
            }).error(function (response) {
                $scope.error = response.message;
            });
        };
    }
]);
