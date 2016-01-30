app.controller('MainController', function (UserFactory, $scope, $timeout, QueueService, $http, auth, store, $location) {
	console.log("MainController Loaded");
	var that = this;

	$scope.auth = auth;

	var INTERVAL = 10000,
		slides = [
			{id:"image00", src:"assets/img/teens-walking.jpg", title: 'Our teens', subtitle: 'are side tracked!'},
			{id:"image01", src:"assets/img/carbroken.jpg", title: 'Our lives', subtitle: 'have unexpected circumstances!'},
			{id:"image02", src:"assets/img/latemeeting.jpg", title: 'Our meetings', subtitle: 'can run late!'},
			{id:"image03", src:"assets/img/sickchild.jpg", title: 'Our loved ones', subtitle: 'need us!'},
			{id:"image04", src:"assets/img/beacon3-horizontal.png", title: 'Finally', subtitle: 'a solution!'}
		];

		function setCurrentSlideIndex(index) {
			$scope.currentIndex = index;
		}

		function isCurrentSlideIndex(index) {
				return $scope.currentIndex === index;
		}

		function nextSlide() {
				$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
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


		// PubNub.init({
		// 	publish_key: 'pub-c-a3c419a4-8b0e-4563-8439-8feb7493d89b',
		// 	subscribe_key: 'sub-c-f5beb90e-7e7d-11e5-ad8e-02ee2ddab7fe',
		// 	uuid:'an_optional_user_uuid'
		// })

		/* ---------------------------------------------------------------------------
		Publish Messages
		--------------------------------------------------------------------------- */

		// $scope.publish = function() {
		// 	PubNub.ngPublish({
		// 		channel: $scope.selectedChannel,
		// 		message: $scope.newMessage
		// 	});
		// };

		/* ---------------------------------------------------------------------------
		Listen for Messages
		--------------------------------------------------------------------------- */

		 // $scope.subscribe = function() {

			// PubNub.ngSubscribe({
			// channel: theChannel,
			// callback: function() { console.log(arguments); }
			// })

			// $rootScope.$on(PubNub.ngMsgEv( theChannel ), function(event, payload) {
			// 	console.log('got a message event:', payload);
			// })

			// $rootScope.$on(PubNub.ngPrsEv(theChannel), function(event, payload) {
			// 	// payload contains message, channel, env...
			// 	console.log('got a presence event:', payload);
			// })
		 // }

		$scope.login = function () {
    		auth.signin({}, function (profile, token) {
		      // Success callback
		      store.set('profile', profile);
		      store.set('token', token);
		      $location.path('/beacons');
		    }, function () {
		      // Error callback
		    });
	  	}

	  	$scope.logout = function() {
			auth.signout();
			store.remove('profile');
			store.remove('token');
		}

});

app.animation('.slide-animation', function ($window) {
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

