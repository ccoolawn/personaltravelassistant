var User = mongoose.model('User');
var travel = require('request');
var http = require('http');


module.exports = (function() {
	return {
		index: function(request, response){
			console.log(request);

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
			user.first_name = request.body.first_name;
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
			User.findOneAndUpdate({_id:request.params.id}, request.body, function(err, record){
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
				// EventEmitter.call(this);

// *************************** ROVSHEN ****************************

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

// ****************************************************************


			// function x (data){
			// 	// profileEmitter = this;
			// 	travel.get('http://api.openweathermap.org/data/2.5/weather?q=' + data + '&units=imperial&APPID=9491e0f2bd9ec591e2f391ec993acaf8',function(error, res){
			// 		if (error)
			// 			console.log(error);
			// 		else {
			// 			// console.log("weather stuff", body);
			// 			// var weather = (JSON.parse(body));
			// 			return res.body;
			// 		}
			// 		// console.log('here!!!!!!!!', weather.sys);
			// 		// console.log("coord", 'Lat:', weather.coord.lat, 'Lon:', weather.coord.lon);
			// 	});
			// }

				// passCountry(body['sys'].country);

				
		},
		images: function(request, response){
			var appendApiKeyHeader = function( xhr ) {
				xhr.setRequestHeader('Api-Key', '2hcw6ysqezmtf8t2y947amqa')
			}
			var searchRequest = { "phrase": that.result1 }

			function GetSearchResults(callback) {
				travel({
					type: "GET",
					beforeSend: appendApiKeyHeader,
					url: "https://api.gettyimages.com/v3/search",
					data: searchRequest})
					.success(function (data, textStatus, jqXHR) { /* use search results */ })
					.fail(function (data, err) { /* handle errors */ });
					console.log('pics?',jqXHR);
					that.images = data;
			}
		},
		recipes: function(request, response){
			function passCountry(data){
				travel('https://restcountries.eu/rest/v1/alpha/' +data, function(error, response, body) {
					console.log(body);
					// passDem(response.demonym);

				})
			};

			// function passDem(data){
			// 	requestify.get('http://api.yummly.com/v1/api/recipes?_app_id=fd181769&_app_key=b226f93c9ebd8cb0ef0fa6f16bc8272c&q='+ data +'&requirePictures=true&maxResult=10&start=10').success(function(response){
			// 			that.recipies = response;
			// 			console.log(that.recipies);
			// 	})
			// };
		}
	}
})();