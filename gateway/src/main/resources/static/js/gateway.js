angular.module('gateway', [ 'ngRoute' ]).config(function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}).controller('navigation',

    function($rootScope, $http, $location, $route) {


        var self = this;

        self.tab = function(route) {
            return $route.current && route === $route.current.controller;
        };

        var authenticate = function(credentials, callback) {

            var headers = credentials ? {
                authorization : "Basic "
                + btoa(credentials.username + ":"
                    + credentials.password)
            } : {};

            $http.get('user', {
                headers : headers
            }).then(function(response) {
                if (response.data.name) {
                    self.authenticated = true;
                } else {
                    self.authenticated = false;
                }
                callback && callback();
            }, function() {
                self.authenticated = false;
                callback && callback();
            });

        }

        authenticate();

        self.credentials = {};

        self.login = function() {
            authenticate(self.credentials, function() {
                if (self.authenticated) {
                    console.log("Login succeeded")
                    self.error = false;
                    self.authenticated = true;
                } else {
                    console.log("Login failed")
                    self.error = true;
                    self.authenticated = false;
                }
            })
        };

        self.logout = function() {
            $http.post('logout', {}).finally(function() {
                self.authenticated = false;
                $location.path("/");
            });
        }

    });