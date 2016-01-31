travApp.controller('MainController', function (MainFactory, $scope, $timeout, $http, auth, store, $location) {
	console.log("MainController Loaded");
	var that = this;

	// $scope.auth = auth;

	var INTERVAL = 8550,
		slides = [
			{id:"image00", src:"/img/famvacation.jpg", title: 'We need', subtitle: 'time together!'},
			{id:"image01", src:"/img/vacation_house.jpg", title: 'To', subtitle: 'become reinvigorated!'},
			{id:"image02", src:"/img/winter.jpg", title: 'Warm', subtitle: 'our hearts!'},
			{id:"image03", src:"/img/pyramids.jpg", title: 'Exploring', subtitle: 'new horizions!'},
			{id:"image04", src:"/img/roadtrip.jpg", title: 'Allow ', subtitle: 'me to help!'}
		];

		function setCurrentSlideIndex(index) {
			$scope.currentIndex = index;
		}

		function isCurrentSlideIndex(index) {
				return $scope.currentIndex === index;
		}

		function nextSlide() {
				$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1.5) ? ++$scope.currentIndex : 0;
				$timeout(nextSlide, INTERVAL);
		}

		function loadSlides() {
				$timeout(nextSlide, INTERVAL);
		}

		$scope.slides = slides;
		$scope.currentIndex = 0;
		$scope.setCurrentSlideIndex = setCurrentSlideIndex;
		$scope.isCurrentSlideIndex = isCurrentSlideIndex;

		loadSlides();


		$scope.login = function () {
    		auth.signin({}, function (profile, token) {
		      // Success callback
		      store.set('profile', profile);
		      store.set('token', token);
		      $location.path('/main');
		    }, function () {
		      // Error callback
		    });
	  	}

	  	$scope.logout = function() {
			auth.signout();
			store.remove('profile');
			store.remove('token');
			$location.path('/login');
		}

});

travApp.animation('.slide-animation', function ($window) {
	return {
		enter: function (element, done) {
			var startPoint = $window.innerWidth * 0.5,
				tl = new TimelineLite();

			tl.fromTo(element.find('.bg'), 1, { alpha: 0}, {alpha: 1})
				.fromTo(element.find('.xlarge'), 1,
					{ left: startPoint, alpha: 0},
					{left: 50, alpha: 1, ease: Ease.easeInOut})
				.fromTo(element.find('.title'), 3,
					{ left: startPoint, alpha: 0},
					{left: 50, alpha: 1, ease: Ease.easeInOut})
				.fromTo(element.find('.subtitle'), 3,
					{ left: startPoint, alpha: 0},
					{left: 50, alpha: 1, ease: Ease.easeInOut, onComplete: done});
		},

		leave: function (element, done) {
			var tl = new TimelineLite();

			tl.to(element, 1, {alpha: 0, onComplete: done});
		}
	}
});

