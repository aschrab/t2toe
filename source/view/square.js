'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'T2ToeSquare',
	render: function () {
		return <span onClick={this.handleClick} style={{ display: 'inline-block', width: '33%' }}>X</span>;
	},
	handleClick: function() {
		alert("Clicked row" + this.props.row + " col " + this.props.col );
	}
});
