'use strict';

var React = require('react');
var Square = require('./square');
var Game = require('../lib/game');

module.exports = React.createClass({
	displayName: 'T2ToeBoard',
	componentDidMount: function() {
	},
	componentWillUnmount: function() {
	},
	move: function(r,c) {
		this._owner.move(r,c);
	},
	render: function() {
		var squares = [];
		var game = this.props.game;

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
