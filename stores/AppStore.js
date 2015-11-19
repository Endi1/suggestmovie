'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');

var CHANGE_EVENT = 'change';
var KEY = 'ecc3489111ee969a6d588ccf196ab85c';


var movie;



function discoverMovies(genresString) {
  $.get('https://api.themoviedb.org/3/discover/movie?api_key='+KEY+'&sort_by=vote_average.desc&language=en&vote_count.gte=100&with_genres='+genresString, function(data) {
    movie = data.results[0];
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
  }
  return true;
});

module.exports = AppStore;
