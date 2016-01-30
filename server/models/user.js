var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
<<<<<<< HEAD
	first_name: { type: String, trim: true },
	last_name: { type: String, trim: true },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

mongoose.model('User', UserSchema);
// UserSchema.path('first_name').required(true, "First Name is required");
=======
  first_name: { type: String, trim: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

mongoose.model('User', UserSchema);
UserSchema.path('first_name').required(true, "First Name is required");
>>>>>>> origin/master
