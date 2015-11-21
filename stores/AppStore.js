'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');

var CHANGE_EVENT = 'change';
var KEY = 'ecc3489111ee969a6d588ccf196ab85c';


var movie;
var movies;

// This displays a random movie form the movies array, which has all the movies displayed according to genres chosen
function reloadMovies() {
  console.log('reloading');
  var i = Math.floor(Math.random() * 19);
  movie = movies.results[i];
  AppStore.emitChange();
}

function discoverMovies(genresString) {
  var i = Math.floor(Math.random() * 19);
  $.get('https://api.themoviedb.org/3/discover/movie?api_key='+KEY+'&sort_by=vote_average.desc&language=en&vote_count.gte=100&with_genres='+genresString, function(data) {
    movies = data;
    movie = data.results[i];
  }).done(function() {
    AppStore.emitChange();
  });
}

function suggestSimilar(m) {
  console.log('similar');
  var id = m.id;
  var i = Math.floor(Math.random() * 19);
  $.get('https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=' + KEY +'&append_to_response=top_rated', function(data) {
    movie = data.results[i];
  }).done(function() {
    AppStore.emitChange();
  });
}



var AppStore = assign({}, EventEmitter.prototype, {
  getMovie: function() {
    return movie;
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
});

AppDispatcher.register(function(action) {
  var genresString;
  switch(action.actionType) {
    case 'discover':
    genresString = action.genresString;
    discoverMovies(genresString);
    break;
    case 'suggest-similar':
    movie = action.movie;
    suggestSimilar(movie);
    break;
    case 'reload':
    reloadMovies();
    break;
  }
  return true;
});

module.exports = AppStore;
