'use strict';
var React = require('react');
var AppStore = require('../stores/AppStore');

var imgURL = 'https://image.tmdb.org/t/p/w500';

var MovieDisplay = React.createClass({
  getInitialState: function() {
    return {movie: {}};
  },
  componentDidMount: function() {
    var movie = AppStore.getMovie();
    this.setState({movie: movie});
  },
  render: function() {
    return(
      <div>
        <div className="row">
          <div className="twelve columns">
            <div className="six columns offset-by-three">
              <h1>{this.state.movie.original_title}</h1>
              <img src={imgURL+this.state.movie.poster_path} />
              <p>{this.state.movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MovieDisplay;
