module.exports = function(app) {
  	var users = require('../controllers/users.js');
	app

	// - - - User - - -
    // Index
	.get('/users', function(request, response) { users.index(request, response) })
	// New
	.get('/users/new', function(request, response) { users.create(request, response) })
	// Show
	.get('/users/:id', function(request, response) { users.show(request, response) })
<<<<<<< HEAD
	// Edit
	.post('/users/:id/edit', function(request, response) { users.update(request, response) })
	// Create
	.post('/users', function(request, response) { users.create(request, response) })
=======
	// Edit 
	.post('/users/:id/edit', function(request, response) { users.update(request, response) })
	// Create
	.post('/users', function(request, response) { users.create(request, response) })	
>>>>>>> origin/master
	// Destroy
	.delete('/users/:id', function(request, response) { users.destroy(request, response) })
	// Update
	.put('/users/:id', function(request, response) { users.update(request, response) })
};