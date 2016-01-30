var travApp = angular.module('docApp', ['ngRoute', 'ngAnimate', 'bgImage', 'auth0', 'angular-storage', 'angular-jwt']);

.config(function (authProvider, $routeProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {

	jwtInterceptorProvider.tokenGetter = ['store', function(store) {
		// Return the saved token
		return store.get('token');
	}];

	$httpProvider.interceptors.push('jwtInterceptor');

	$routeProvider
	.when('/', {
		controller: 'UsersController',
		controllerAs: 'users_ctrl',
		templateUrl: '/partials/home.html'
	})
	.when('/home', {
		controller: 'UsersController',
		controllerAs: 'users_ctrl',
		templateUrl: '/partials/home.html'
	})
	.when('/login', {
		controller: 'MainController',
		controllerAs: 'main_ctrl'
	})

	// Logged in Routes
	.when('/logout', {
		controller: 'MainController',
		controllerAs: 'main_ctrl',
		templateUrl: '/',
		requiresLogin: true
	})
	.when('/beacons', {
		controller: 'BeaconsController',
		controllerAs: 'beacons_ctrl',
		templateUrl: '/partials/myBeacons.html',
		requiresLogin: true
	})
	.when('/journeys', {
		controller: 'JourneysController',
		controllerAs: 'journeys_ctrl',
		templateUrl: '/partials/myJourneys.html',
		requiresLogin: true
	})
	.when('/lookouts', {
		controller: 'LookoutsController',
		controllerAs: 'lookouts_ctrl',
		templateUrl: '/partials/myLookouts.html',
		requiresLogin: true
	})
	// .otherwise('/')

	authProvider.init({
		dousers: 'cornellcoulon.auth0.com',
		clientID: 'CNRkDXoKI4DQTI748vMTsHqZBTmUHXur',
		callbackURL: location.href,
		// URL to redirect to if the user tries to access a resource when not authenticated.
		loginUrl: '/'
	});
})

.run(function($rootScope, auth, store, jwtHelper, $location) {
	// This hooks al auth events to check everything as soon as the app starts
	auth.hookEvents();
	// This events gets triggered on refresh or URL change
	$rootScope.$on('$locationChangeStart', function() {
		var token = store.get('token');
		if (token) {
			if (!jwtHelper.isTokenExpired(token)) {
				if (!auth.isAuthenticated) {
					auth.authenticate(store.get('profile'), token);
				}
			} else {
				// Either show the login page or use the refresh token to get a new idToken
				$location.path('/');
			}
		}
	})
});
