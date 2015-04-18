require('./styles/main.scss');

var React = window.React = require('react')
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Game = require('./pages/game');
var Home = require('./pages/home');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<header>
					<nav>
						<ul>
							<li>
								<Router.Link to="app">Home</Router.Link>
							</li>
							<li>
								<a href="https://github.com/aschrab/t2toe">GitHub</a>
							</li>
						</ul>
					</nav>
					<h1>T<sup>2</sup>Toe</h1>
				</header>
				<RouteHandler />
			</div>
		);
	}
})

var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="game" path="board" handler={Game} />
		<Router.DefaultRoute handler={Home} />
	</Route>
);

Router.run(routes, function (Handler) {
	React.render(<Handler />, document.body);
});
