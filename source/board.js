'use strict';

var React = require('react');
var Square = require('./view/square');
var Game = require('./game');

module.exports = React.createClass({
	displayName: 'T2ToeBoard',
	getInitialState: function() {
		return { game: new Game() };
	},
	componentDidMount: function() {
	},
	componentWillUnmount: function() {
	},
	move: function(r,c) {
		this.setState({ game: this.state.game.move(r,c) });
	},
	render: function() {
		var squares = [];
		var game = this.state.game;

		for( var r = 0; r < 3; ++r ) {
			for( var c = 0; c < 3; ++c ) {
				var k = 'r' + r + 'c' + c;
				var owner = game.owner(r,c);
				squares.push( <Square key={k} row={r} col={c} owner={owner} /> );
			}
		}

		return <div>{squares}</div>;
	},
	_onChange: function() {
	}
});
