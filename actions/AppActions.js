'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {

  discover: function(genresString) {
    AppDispatcher.dispatch({
      actionType: 'discover',
      genresString: genresString
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
