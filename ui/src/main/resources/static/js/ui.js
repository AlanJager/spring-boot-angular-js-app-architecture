angular.module('ui', [ 'ngRoute', 'auth', 'home', 'navigation'])
    .config(function($locationProvider, $routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl : 'js/home/home.html',
            controller : 'home'
        }).when('/login', {
            templateUrl : 'js/navigation/login.html',
            controller : 'navigation'
        }).otherwise('/');


        $locationProvider.html5Mode(true);

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}).run(function (auth) {
    auth.init('/', '/login', '/logout');
})