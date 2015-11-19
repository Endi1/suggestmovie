'use strict';
var React = require('react');







var App = React.createClass({
  render : function() {
    return(
      <div>
        <div className="header">
            <h1>SuggestMovie</h1>
            <div className="left-side">
              <h3>About</h3>
              <h3>How it works</h3>
            </div>
        </div>
        <div className="container">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
