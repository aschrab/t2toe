var React = require('react');
var Game = require('../component/game');
var Router = require('react-router');

module.exports = React.createClass({
	displayName: "T2ToeGamePage",
	render: function() {
		return (
			<div>
				<Game />
				<Router.Link to="strange">Give up</Router.Link>
			</div>
		);
	}
});
