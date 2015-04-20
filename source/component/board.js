'use strict';

var React = require('react');
var Square = require('./square');

module.exports = React.createClass({
	displayName: 'T2ToeBoard',
	render: function() {
		var squares = [];
		var game = this.props.game;

		for( var s = 0; s < 9; ++s ) {
			var owner = game.owner(s);
			squares.push( <Square key={s} space={s} owner={owner} /> );
		}

		return <div className="board">{squares}</div>;
	},
});
