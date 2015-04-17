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

		for( var s = 0; s < 9; ++s ) {
			var owner = game.owner(s);
			squares.push( <Square key={s} space={s} owner={owner} /> );
		}

		return <div className="board">{squares}</div>;
	},
	_onChange: function() {
	}
});
