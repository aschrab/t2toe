'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'T2ToeSquare',
	render: function () {
		var classes = "square";
		if (this.props.owner)
			classes += " player" + this.props.owner;
		return <span onClick={this.handleClick} className={classes}>{this.props.space}&nbsp;</span>;
	},
	handleClick: function() {
		this._owner.move(this.props.space);
	}
});
