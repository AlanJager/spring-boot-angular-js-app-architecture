// Created by AlanJager on 2016/11/13.
//
// angular.module('home', []).controller('home', function($http) {
//     var self = this;
//
//     $http.get('token').then(function(response) {
//         $http({
//             url : 'http://localhost:9000',
//             method : 'GET',
//             headers : {
//                 'X-Auth-Token' : response.data.token
//             }
//         }).then(function(response) {
//             self.greeting = response.data;
//         });
//     })
// });
angular.module('home', []).controller('home', function($http) {
    var self = this;
    $http.get('/user/').then(function(response) {
        self.user = response.data.name;
    });
});