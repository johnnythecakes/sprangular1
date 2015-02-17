var app = angular.module('spaApp',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider

    .state('home', {
        url: '/home',
        template: '<h1>HOME VIEW for {{user}}</h1>',
        controller: function($scope){$scope.user = "Zach"}
    })
    .state('about', {
        url: '/about',
        template: '<h1>ABOUT VIEW</h1><a ui-sref=".portfolio">portfolio link</a><div ui-view></div>'
    })
    .state('about.portfolio', {
        url: '/portfolio',
        template: '<h2>portfolio view</h2>',
    })
});