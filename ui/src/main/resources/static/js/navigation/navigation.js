/**
 * Created by zouye on 2016/11/13.
 */

angular.module('navigatoin', []).controller(function($rootScope, $http, $location, $route) {
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
                $rootScope.authenticated = true;
            } else {
                $rootScope.authenticated = false;
            }
            callback && callback();
        }, function() {
            $rootScope.authenticated = false;
            callback && callback();
        });

    }

    authenticate();

    self.credentials = {};
    self.login = function() {
        authenticate(self.credentials, function() {
            if ($rootScope.authenticated) {
                console.log("Login succeeded")
                $location.path("/");
                self.error = false;
                $rootScope.authenticated = true;
            } else {
                console.log("Login failed")
                $location.path("/login");
                self.error = true;
                $rootScope.authenticated = false;
            }
        })
    };

    self.logout = function() {
        $http.post('logout', {}).finally(function() {
            $rootScope.authenticated = false;
            $location.path("/");
        });
    }
});
