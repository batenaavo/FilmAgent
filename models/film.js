var mongoose = require('mongoose');


var filmSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	director:{
		type: String,
		required: true
	},
	year:{
		type: String
	},
	length:{
		type: String
	},
	image_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Film = module.exports = mongoose.model('Film', filmSchema);

module.exports.getFilms = function(callback, limit){
	Film.find(callback).limit(limit);
}

module.exports.addFilm = function(film, callback){
	Film.create(film, callback);
}

module.exports.deleteFilm = function(id, callback){
	var query = {_id: id};
	Film.remove(query, callback);
}