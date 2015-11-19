'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {

  discover: function(genresString) {
    AppDispatcher.dispatch({
      actionType: 'discover',
      genresString: genresString
    });
  }


};

module.exports = AppActions;
