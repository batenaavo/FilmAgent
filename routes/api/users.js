var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');



User = require('/home/quim/Projects/FilmAgent/models/user');

mongoose.connect('mongodb://localhost/films');
var db = mongoose.connection;

/* GET users page. */
router.get('/',function(req,res){
	User.getUsers(function(err, users){
		if(err){
			throw err;
		}
		res.json(users); 	
	});
});

//Validate Login
router.post('/', [
  // username must not be empty
  check('username').exists(),
  // password must not be empty
  check('password').exists()
  ], (req, res) => {
  	console.log(req.body);
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
  	return res.status(422).json({ errors: errors.array() });
  }

  const userToFind = req.body;

  User.getUser(userToFind, function(err, user){
  	if(err){
  		throw err;
  	}
  	if(user){
  		res.send(user._id);
  		console.log(user._id);;
  	}
  	else{
  		res.send(422, { error: "invalid username or password" });
  		console.log(422, { error: "invalid username or password" });
  	}
  });
});


	router.post('/add',function(req,res,next){
		var user = req.body;
		User.addUser(user, function(err, user){
			if(err){
				throw err;
			}
			res.redirect('/');	
		});
	});

	module.exports = router;