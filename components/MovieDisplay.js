'use strict';
var React = require('react');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var imgURL = 'https://image.tmdb.org/t/p/w500';

var RaisedButton = require('material-ui').RaisedButton;


var MovieDisplay = React.createClass({
  counter: 0,
  handleClick: function() {
    AppActions.nextMovie(this.state.movie);
  },
  getInitialState: function() {
    return {movie: {}};
  },
  storeChanged: function() {
    var movie = AppStore.getMovie();
    if(this.isMounted()){
      this.setState({movie: movie});
    }
  },
  componentDidMount: function() {
    var movie = AppStore.getMovie();
    this.setState({movie: movie});
    AppStore.on('change', this.storeChanged);
  },
  render: function() {
    return(
      <div>
        <div className="row">
          <div className="six columns offset-by-three">
            <h1>{this.state.movie.title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <img className="poster-img" src={imgURL+this.state.movie.poster_path} />
          </div>
          <div className="six columns">
            <p>{this.state.movie.overview}</p>
            <div className="four columns offset-by-five">
              <RaisedButton primary={true} ref="nextButton" label="Suggest another movie" onClick={this.handleClick}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MovieDisplay;
