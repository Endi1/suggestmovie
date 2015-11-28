'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {

  discover: function(genresString, genres) {
    AppDispatcher.dispatch({
      actionType: 'discover',
      genresString: genresString,
      genres: genres
    });
  },

  nextMovie: function(movie) {
    AppDispatcher.dispatch({
      actionType: 'next-movie',
      movie: movie
    });
  }


};

module.exports = AppActions;
