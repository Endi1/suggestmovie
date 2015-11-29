var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./components/App');
var GenreDisplay = require('./components/GenreDisplay');
var MovieDisplay = require('./components/MovieDisplay');
var About = require('./components/AboutDisplay');

var createHistory = require('history').createHashHistory;

var history = createHistory({
  queryKey: false
});

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App} >
      <IndexRoute component={GenreDisplay} />
      <Route path="1" component={MovieDisplay} />
      <Route path="about" component={About} />
    </Route>
  </Router>,
  document.getElementById('app')
);
