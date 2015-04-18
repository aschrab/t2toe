var React = require('react');
var Square = require('./square');
var Game = require('../lib/game');
var Board = require('./board');
var WOPR = require('../lib/wopr');
var Dispatcher = require('../dispatcher/game');

module.exports = React.createClass({
	displayName: 'T2ToeGameView',
	getInitialState: function() {
		return { game: new Game() };
	},
	handleEvent: function(payload) {
		switch (payload.action) {
			case 'move':
				this.move( payload.square );
				break;
		}
	},
	componentDidMount: function() {
		var self = this;
		this.dispatchCallback = Dispatcher.register( this.handleEvent );
	},
	componentWillUnmount: function() {
		Dispatcher.unregister(this.dispatchCallback);
	},
	move: function(r,c) {
		var game = this.state.game;

		if (game.winner()) return;

		game = game.move(r,c);
		if (!game.winner())
			game = WOPR.move(game);

		this.setState({ game: game });
	},
	newGame: function() {
		this.setState({ game: new Game() });
	},
	render: function() {
		var game = this.state.game;

		winner = "square player" + game.winner();

		return <div className="game">
			<div className={winner}/>
			<Board game={game}/>

			<button type="button" onClick={this.newGame}>New Game</button>
		</div>
	}
})
