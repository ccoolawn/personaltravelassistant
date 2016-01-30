'use strict';

angular.module( "animation", [])
	.animation('.slide-animation', function ($window) {
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
