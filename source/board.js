'use strict';

var React = require('react');
var Square = require('./view/square');
var Game = require('./game');
var WOPR = require('./wopr');

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
		var game = this.state.game;
		game = game.move(r,c);
		game = WOPR.move(game);
		this.setState({ game: game });
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

		return <div className="board">{squares}</div>;
	},
	_onChange: function() {
	}
});
