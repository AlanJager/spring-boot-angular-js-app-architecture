// Created by AlanJager on 2016/11/13.

angular.module('admin', []).controller('home',

    function($routeScope, $http) {

        $http.get('user').then(function(response) {
            var data = response.data;
            if (data.name) {
                self.authenticated = true;
                self.user = data;
                computeDefaultTemplate(data);
            } else {
                self.authenticated = false;
            }
            self.error = null
        })

    })