var User = mongoose.model('User');
//var travel = require('request'); 
var http = require('http');

module.exports = (function() {
	return {
		index: function(request, response){
			console.log("Server / Ctrl / Users - Index")
			// var users = [{first_name:'Winners!!!!'}];
			User.find({}, function(err, users){
				if(err){
					console.log(err);
					response.json([{first_name:"Updating, please be patient..."}]);
				}
				else{
					console.log(users);
					response.json(users);
				}
			})
		},
		new: function(request, response){
			console.log("Server / Ctrl / Users - New")
		},
		create: function(request, response){
			console.log("Server / Ctrl / Users - Create")
			var user = new User;
			user.created_at = request.body.created_at;
			user.time = request.body.time;
			user.name = request.body.name;
			user.complaint = request.body.complaint;
			console.log("Server / Ctrl / Users - New")
		},
		create: function(request, response){
			console.log("Server / Ctrl / Users - Create")
			var user = new User;
			user.first_name = request.body.first_name;
			user.last_name = request.body.last_name;
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
			console.log("Server / Ctrl / Users - Update", request.body)
			user.findOneAndUpdate({_id:request.params.id}, request.body, function(err, record){
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
			console.log("Server / Ctrl / Users - Show")
		},
		destroy: function(request, response){
			console.log("Server / Ctrl / Users - Destroy");
			console.log("Destroy params id:", request.params.id);
			User.remove({_id:request.params.id}, function(err){
				if(err){
					console.log(err);
					response.json({status:false});
				}
				else{
					response.json({status:true});
				}
			})

		}, 

		fetch: function(request, response){
			console.log("Server / Ctrl/ Users - Fetch 4");
			var place = {};
			var that = this;
				that.result1 = request.body.city;
				that.options1 = null;
				that.details1 = '';
				that.weather = '';
				that.recipies = '';
				// console.log(that.options1);
				// console.log(that.details1);
			var pendingTask;
				if (that.result1 === undefined) {
					that.result1 = "";
				}
				that.change = function() {
					if (pendingTask) {
						clearTimeout(pendingTask);
					}
					pendingTask = setTimeout(fetch, 800);
				};
				console.log(that.result1);



				function travelGet (data, callback){

					travel.get('http://api.openweathermap.org/data/2.5/weather?q=' + data + '&units=imperial&APPID=9491e0f2bd9ec591e2f391ec993acaf8',function(error, res){
						if (error)
							console.log(error);
						else {;
							callback(res.body);
						}
					});
				}

			travelGet(that.result1, function(q){
				response.json(q);
			});
		}
	}
})