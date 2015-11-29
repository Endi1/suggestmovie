var React = require('react');

var AboutDisplay = React.createClass({
  render: function() {
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="four columns offset-by-five">
              <h1>About</h1>
            </div>
          </div>
          <div className="row">
            <div className="six columns offset-by-three">
              <p>This is a tool that can be used to get movie suggestions when you can't decide on what to watch.
              It's still a bit rough and needs some polishing (especially on the design side)
              but as it was made as a side project for fun it can be understandable that some things may not be very polished.</p>
              <p>
                Now that that got out of the way, let's get into some of the nerdy stuff.
              </p>

              <p>
                The project is completely free and open source and can be found on <a href="https://github.com/Endi1/suggestmovie">GitHub</a>.
                Feel free to fork it and contribute if you feel like it.
              </p>

              <p>
                To find movie information I am using <a href="http://themoviedb.org">The Movie Database</a> API which is pretty cool.
              </p>

              <p>
                It's built on React and I am using Material-UI for react for the components.
                Since Material-UI gives me all the UI components I need, I have used Skeleton for its  grid system.
              </p>

              <p>
                If you want to know more in depth on how everything works, head over to <a href="#/how">How it works</a> page.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = AboutDisplay;
