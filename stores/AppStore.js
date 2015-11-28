'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');

var CHANGE_EVENT = 'change';
var KEY = 'ecc3489111ee969a6d588ccf196ab85c';


var movie;
var movies = [];
var counter = 0;


// This is a helper function that adds the contents of the b array to the a array
function extend(a, b) {
  var i, l = b.length;
  for(i = 0; i < l; i++) {
    a.push(b[i]);
  }
}

// This displays a random movie from the movies array, which has all the movies displayed according to genres chosen
function reloadMovie() {
  var i = Math.floor(Math.random() * 39);
  movie = movies[i];
  if(movie === undefined){
    reloadMovie();
  }
  AppStore.emitChange();
  return;
}

function nextMovie(m) {
  var id = m.id;
  var i = Math.floor(Math.random() * 19);
  $.get('https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=' + KEY +'&append_to_response=top_rated', function(data) {
    if(counter === 3){
      counter = 0;
      reloadMovie();
      return;
    } else {
      movie = data.results[i];
      if(movie === undefined) {
        reloadMovie();
      }
      counter++;
    }
  }).done(function() {
    AppStore.emitChange();
  });
}

function discoverMovies(genresString) {
  var i = Math.floor(Math.random() * 39);
  // load two pages into the movies array
  $.get('https://api.themoviedb.org/3/discover/movie?api_key='+KEY+'&sort_by=vote_average.desc&language=en&vote_count.gte=100&with_genres='+genresString, function(data) {
    movies = data.results;
  }).done(function() {
    $.get('https://api.themoviedb.org/3/discover/movie?api_key='+KEY+'&sort_by=vote_average.desc&language=en&&page=2&vote_count.gte=100&with_genres='+genresString, function(data) {
      extend(movies, data.results);
      movie = movies[i];
      console.log(movies);
    }).done(function() {
      AppStore.emitChange();
    });
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
    case 'next-movie':
    movie = action.movie;
    nextMovie(movie);
    break;
  }
  return true;
});

module.exports = AppStore;
