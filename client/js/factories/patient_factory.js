docApp.factory('PatientFactory', function($http, $location){
	return {
		getPatients: function(callback){
			console.log("PatientsFactory getPatients");
			$http.get('/patients').success(function(response){
				callback(response);
			})
		},
		add: function(newPatient, callback){
			if(newPatient){
				console.log("PatientsFactory add ", newPatient);
				$http.post('/patients', newPatient).success(function(response){
					callback(response);
				})
			}
		},
		remove: function(patient, callback){
			console.log("PatientsFactory remove ", patient);
			$http.delete('/patients/'+patient._id).success(function(response){
				callback();
			})
		},
		update: function(patient){
			console.log("PatientsFactory remove ", patient);
			$http.put('/patients/'+patient._id, user).success(function(response){
				$location.path('/patients');
			})
		},
		setPatient: function(patient){
			this.patient = patient;
			$location.path('/patients/details');
		},
		getPatient: function(){
			if(!this.patient)
				$location.path('/patients');
			return this.patient;
		}
	}
})