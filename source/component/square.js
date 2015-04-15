'use strict';

var React = require('react');
var Dispatcher = require('../dispatcher/game');

module.exports = React.createClass({
	displayName: 'T2ToeSquare',
	render: function () {
		var classes = "square";
		if (this.props.owner)
			classes += " player" + this.props.owner;
		return <span onClick={this.handleClick} className={classes}>{this.props.space}&nbsp;</span>;
	},
	handleClick: function() {
		Dispatcher.dispatch({ action: 'move', square: this.props.space });
	}
});
