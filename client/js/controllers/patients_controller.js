
docApp.controller('PatientsController', function($scope, PatientFactory){
	console.log("PatientsController Loaded");
	// var that = this;

	var getPatients = function(){
		PatientFactory.getPatients(function(patients){
			$scope.patients = patients;
		});
	}
	getPatients();
	$scope.add = function(newPatient){
			console.log('im here!',newPatient);
		PatientFactory.add(newPatient, function(){
			getPatients();
		})
	}
	$scope.remove = function(patient){
		PatientFactory.remove(patient, function(){
			getPatients();
		})
	}
	$scope.show = function(patient){
		PatientFactory.setPatient(patient);
	}

	// date
	$scope.today = function() {
		$scope.dt = new Date();
	};
		$scope.today();

	$scope.clear = function () {
		$scope.dt = null;
	};
})

docApp.controller('PatientController', function(PatientFactory){
	console.log("PatientController Loaded");
	$scope.patient = PatientFactory.getPatient();
	$scope.update = function(patient){
		PatientFactory.update(patient);
	}
})