var docApp = angular.module('docApp', ['ngRoute', 'ui.bootstrap']);



docApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		// controller: 'HomeController'
		templateUrl: '/partials/login.html'
	})
	.when('/logout', {
		// controller: 'HomeController'
		templateUrl: '/partials/login.html'
	})
	.when('/patients', {
		controller: 'PatientsController',
		controllerAs: 'patiCtrl',
		templateUrl: '/partials/patients.html'
	})
	.when('/appointments', {
		controller: 'PatientsController',
		controllerAs: 'patiCtrl',
		templateUrl: '/partials/appointments.html'
	})
	.when('/cancel', {
		// controller: 'PatientsController',
		// controllerAs: 'patiCtrl',
		templateUrl: '/partials/appointments.html'
	})

	.otherwise('/')
})