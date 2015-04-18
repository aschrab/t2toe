var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
	render: function() {
		return (
			<div>
				<Link to="game">Shall we play a game?</Link>
			</div>
		)
	}
});
