var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./components/App');
var GenreDisplay = require('./components/GenreDisplay');


var createHistory = require('history').createHashHistory;

var history = createHistory({
  queryKey: false
});

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App} >
      <IndexRoute component={GenreDisplay} />
    </Route>
  </Router>,
  document.getElementById('app')
);
