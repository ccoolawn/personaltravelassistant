var User = mongoose.model('User');

module.exports = (function() {
	return {
		index: function(request, response){
			console.log("Server / Ctrl / Users - Index")
			// var users = [{first_name:'Winners!!!!'}];
			User.find({}, function(err, users){
				if(err){
					console.log(err);
<<<<<<< HEAD
					response.json([{first_name:"Updating, please be user..."}]);
=======
					response.json([{first_name:"Updating, please be patient..."}]);
>>>>>>> origin/master
				}
				else{
					console.log(users);
					response.json(users);
				}
			})
		},
		new: function(request, response){
<<<<<<< HEAD
			console.log("Server / Ctrl / Patients - New")
		},
		create: function(request, response){
			console.log("Server / Ctrl / Patients - Create")
			var user = new User;
			user.created_at = request.body.created_at;
			user.time = request.body.time;
			user.name = request.body.name;
			user.complaint = request.body.complaint;
=======
			console.log("Server / Ctrl / Users - New")
		},
		create: function(request, response){
			console.log("Server / Ctrl / Users - Create")
			var user = new User;
			user.first_name = request.body.first_name;
>>>>>>> origin/master
			user.save(function(err){
				if(err){
					console.log(err);
					response.json({status:false});
				}
				else{
					response.json({status:true});
				}
			})
		},
		edit: function(request, response){
			console.log("Server / Ctrl / Users - Edit")
		},
		update: function(request, response){
<<<<<<< HEAD
			console.log("Server / Ctrl / Patients - Update", request.body)
			user.findOneAndUpdate({_id:request.params.id}, request.body, function(err, record){
=======
			console.log("Server / Ctrl / Users - Update", request.body)
			User.findOneAndUpdate({_id:request.params.id}, request.body, function(err, record){
>>>>>>> origin/master
				if(err){
					console.log(err);
					response.json({status:false});
				}
				else{
					response.json({status:true});
				}
			})
		},
		show: function(request, response){
<<<<<<< HEAD
			console.log("Server / Ctrl / Patients - Show")
		},
		destroy: function(request, response){
			console.log("Server / Ctrl / Patients - Destroy");
			console.log("Destroy params id:", request.params.id);
			user.remove({_id:request.params.id}, function(err){
=======
			console.log("Server / Ctrl / Users - Show")
		},
		destroy: function(request, response){
			console.log("Server / Ctrl / Users - Destroy");
			console.log("Destroy params id:", request.params.id);
			User.remove({_id:request.params.id}, function(err){
>>>>>>> origin/master
				if(err){
					console.log(err);
					response.json({status:false});
				}
				else{
					response.json({status:true});
				}
			})
		}
	}
})();