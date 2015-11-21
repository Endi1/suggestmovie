'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {

  discover: function(genresString) {
    AppDispatcher.dispatch({
      actionType: 'discover',
      genresString: genresString
    });
  },

  suggestSimilar: function(movie) {
    AppDispatcher.dispatch({
      actionType: 'suggest-similar',
      movie: movie
    });
  },

  reload: function() {
    AppDispatcher.dispatch({
      actionType: 'reload'
    });
  }


};

module.exports = AppActions;
