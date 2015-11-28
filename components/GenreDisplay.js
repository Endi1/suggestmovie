'use strict';
var React = require('react');
var Checkbox = require('material-ui').Checkbox;
var Link = require('react-router').Link;
var $ = require('jquery');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');


var KEY = 'ecc3489111ee969a6d588ccf196ab85c';

var RaisedButton = require('material-ui').RaisedButton;
var FlatButton = require('material-ui').FlatButton;

var GenreDisplay = React.createClass({
  storeChanged: function() {
    // doing this because it would otherwise add a 1 when the MovieDisplay is being re-rendered
    if(location.href.slice(-3) === '/#/') {
      location.href += '1';
    }
  },
  componentDidMount: function() {
    AppStore.on('change', this.storeChanged);
  },
  clickedButton: function() {
    var genres = this.state.checked;
    var genresString = '';
    var i, l = genres.length;
    // we use AND instead of OR if we have less than 4 genres selected;
    if(l <= 3) {
      for(i=0; i<l; i++) {
        genresString += genres[i] + ',';
      };
    } else {
      for(i=0; i<l; i++) {
        genresString += genres[i] + '|';
      }
    }
    AppActions.discover(genresString, genres);
  },
  getInitialState: function() {
    return {checked: [], disabled: true};
  },
  onCheck: function(event, c) {
    var checked = this.state.checked;
    if(c === true){
      // Pushing value only;
      checked.push(event.target.defaultValue);
      this.setState({checked: checked, disabled: false});
    }
    // Check if every checkbox gets unchecked and then disable button
    if(c === false) {
      var disabled = false;
      var i = checked.indexOf(event.target.defaultValue);
      checked.splice(i, 1);
      if(checked.length === 0) {
        disabled = true;
      }
      this.setState({checked: checked, disabled: disabled});
    }
  },
  render: function() {
    var genreGroups = [[], [], [], [], []];
    var l = this.props.genres.length, i;

    // Checkboxes are pushed into a 2-dimensional array so that they can be displayed using skeleton
    // lines is 1x4
    for(i=0; i<l; i++) {
      genreGroups[i%4].push(<Checkbox
                  name={this.props.genres[i].name}
                  key={this.props.genres[i].id}
                  value={this.props.genres[i].id}
                  label={this.props.genres[i].name}
                  onCheck={this.onCheck}/>);
    }
    return(
      <div>
        <div className="header row">
          <div className="sixteen columns">
            <div className="six columns offset-by-four buttons">
              <FlatButton label="Suggest movie" />
              <FlatButton label="About" />
              <FlatButton label="How it works" />
            </div>
          </div>
        </div>
        <div className="banner-wrapper">

        </div>
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <h1>Please select your favourite genre(s).</h1>
            </div>
          </div>
          <div className="row">
            <div className="three columns">
              {genreGroups[0]}
            </div>
            <div className="three columns">
              {genreGroups[1]}
            </div>
            <div className="three columns">
              {genreGroups[2]}
            </div>
            <div className="three columns">
              {genreGroups[3]}
            </div>
            <div className="twelve columns">
              <div className="two columns offset-by-five">
                <div className="next-button"><RaisedButton ref="nextButton" label="Next" disabled={this.state.disabled} onClick={this.clickedButton} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

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
