'use strict';
var React = require('react');
var Checkbox = require('material-ui').Checkbox;
var $ = require('jquery');

var KEY = 'ecc3489111ee969a6d588ccf196ab85c';


var GenreDisplay = React.createClass({
  render: function() {
    var lines = [[], [], [], []];
    var l = this.props.genres.length, i;

    // Checkboxes are pushed into a 2-dimensional array so that they can be displayed using skeleton
    // lines is 1x4
    for(i=0; i<l; i++) {
      lines[i%4].push(<Checkbox
                  name={this.props.genres[i].name}
                  value={this.props.genres[i].id}
                  label={this.props.genres[i].name}/>);
    }
    return(
      <div>
        <div className="row">
          <div className="six columns">
            {lines[0]}
          </div>
          <div className="six columns">
            {lines[1]}
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            {lines[2]}
          </div>
          <div className="six columns">
            {lines[3]}
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
