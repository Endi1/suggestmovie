'use strict';
var React = require('react');
var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var imgURL = 'https://image.tmdb.org/t/p/w500';

var RaisedButton = require('material-ui').RaisedButton;


var MovieDisplay = React.createClass({
  counter: 0,
  handleClick: function(button) {
    if(button === 's'){
      // the counter is used to keep a scope in search, otherwise clicking similar too many times loses the scope
      this.counter ++;
      if(this.counter === 3) {
        AppActions.reload();
        this.counter = 0;
      } else {
        AppActions.suggestSimilar(this.state.movie);
      }
    } else {
      // Load movies based on the genres, this happens when "different" is clicked
      AppActions.reload();
    }
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
          <div className="three columns">
            <RaisedButton primary={true} ref="differentButton" label="Different" onClick={this.handleClick.bind(this, 'd')}/>
          </div>
          <div className="three columns offset-by-six">
            <RaisedButton secondary={true} ref="sameButton" label="Similar" onClick={this.handleClick.bind(this, 's')}/>
          </div>
          </div>
        </div>
        <div className="row">
        </div>
      </div>
    );
  }
});

module.exports = MovieDisplay;
