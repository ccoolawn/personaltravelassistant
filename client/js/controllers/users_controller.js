travApp.controller('UsersController', function(UserFactory, $location, $scope, auth){
	console.log("UsersController Loaded");
	var that = this;

	that.result1 = '';
	that.weather = {};

	that.fetch = function() {
		console.log(that.result1,"1");
		wcFactory.runApi(that.result1, function(res){
			that.weather = (JSON.parse(res));
			console.log(that.weather.name);
			new Maplace({
				map_options: {
					set_center: [that.weather.coord.lat, that.weather.coord.lon],
					zoom: 12
				}
			}).Load();
		});
	};

	var getUsers = function(){
		UserFactory.getUsers(function(users){
			that.users = users;
		});
	}
	getUsers();
	that.add = function(newUser){
			console.log('im here!',newUser);
		UserFactory.add(newUser, function(){
			getUsers();
		})
	}
	that.remove = function(user){
		UserFactory.remove(user, function(){
			getUsers();
		})
	}
	that.show = function(user){
		UserFactory.setUser(user);
	}
	that.update = function(user){
		UserFactory.update(user);
	}

	// date
	that.today = function() {
		that.dt = new Date();
	};
		that.today();

	that.clear = function () {
		that.dt = null;
	};
})