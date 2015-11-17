'use strict';
var React = require('react');
var $ = require('jquery');

var GenreDisplay = require('./GenreDisplay');



var KEY = 'ecc3489111ee969a6d588ccf196ab85c';



var App = React.createClass({
  componentDidMount : function() {
    var self = this;
    $.get('https://api.themoviedb.org/3/genre/movie/list?api_key=' + KEY, function(data) {
      if (self.isMounted()) {
        self.setState({genres : data.genres});
      }
    });
  },
  getInitialState : function() {
    return {genres: []};
  },
  render : function() {
    return(
      <div>
          {<GenreDisplay genres={this.state.genres} />}
      </div>
    );
  }
});

module.exports = App;
