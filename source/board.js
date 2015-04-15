'use strict'

var React = require('react');
var Square = require('./view/square');

module.exports = React.createClass({
	displayName: 'T2ToeBoard',
	getInitialState: function() {
		return null;
	},
	componentDidMount: function() {
	},
	componentWillUnmount: function() {
	},
	render: function() {
		var squares = [];

		for( var r = 0; r < 3; ++r ) {
			for( var c = 0; c < 3; ++c ) {
				var k = 'r' + r + 'c' + c;
				squares.push( <Square key={k} row={r} col={c} /> );
			}
		}

		return <div>{squares}</div>;
	},
	_onChange: function() {
	}
});
