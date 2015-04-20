var React = require('react');
var GameView = require('../component/game_view');
var Router = require('react-router');

module.exports = React.createClass({
	displayName: "T2ToeGamePage",
	render: function() {
		return (
			<div>
				<GameView />
				<Router.Link to="strange">Give up</Router.Link>
			</div>
		);
	}
});
