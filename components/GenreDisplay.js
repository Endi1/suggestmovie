'use strict';
var React = require('react');

var Line = React.createClass({
  render : function () {
      return(<div><span>{this.props.name}</span></div>);
  }
});


var GenreDisplay = React.createClass({
  render: function() {
    var lines = [];
    var l = this.props.genres.length, i;
    for(i=0; i<l; i++) {
      lines.push(<Line name={this.props.genres[i].name} key={this.props.genres[i].id} />);
    }
    return(
      <div>{lines}</div>
    );
  }
});

module.exports = GenreDisplay;
