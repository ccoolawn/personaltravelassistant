app.controller('MainController', function(){
	console.log("MainController Loaded");
	
})

app.controller('UsersController', function(UserFactory){
	console.log("UsersController Loaded");
	var that = this;
	
	var getUsers = function(){
		UserFactory.getUsers(function(users){
			that.users = users;
		});
	}
	getUsers();
	this.add = function(newUser){
		UserFactory.add(newUser, function(){
			getUsers();
		})
	}
	this.remove = function(user){
		UserFactory.remove(user, function(){
			getUsers();
		})
	}
	this.show = function(user){
		UserFactory.setUser(user);
	}
})

app.controller('UserController', function(UserFactory){
	console.log("UserController Loaded");
	this.user = UserFactory.getUser();
	this.update = function(user){
		UserFactory.update(user);
	}
})