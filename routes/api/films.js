var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

Film = require('/home/quim/Projects/FilmAgent/models/film');

mongoose.connect('mongodb://localhost/films');
var db = mongoose.connection;



/* GET films page. */
router.get('/',function(req,res){
	Film.getFilms(function(err, films){
		if(err){
			throw err;
		}
		res.json(films); 	
	});
});

router.get('/:title', function(req,res,next){
	res.send(req.params.title);
});

router.post('/',function(req,res,next){
	var title = req.body.title;
	res.redirect('/films/' + title);
});

router.post('/submit', function(req,res){ 
	var film = req.body;
	Film.addFilm(film, function(err, film){
		if(err){
			throw err;
		}
		res.json(film);  	
	});
});

router.delete('/:_id', function(req,res){ 
	var id = req.params._id;
	Film.deleteFilm(id, function(err, film){
		if(err){
			throw err;
		}
		res.json(film);  	
	});
});


module.exports = router;