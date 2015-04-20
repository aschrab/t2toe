var React = require('react');
var GameStore = require('../store/game_store');
var Square = require('./square');
var Board = require('./board');
var Winner = require('./winner');
var Dispatcher = require('../dispatcher/game_dispatch');

module.exports = React.createClass({
	displayName: 'T2ToeGameView',
	getInitialState: function() {
		this.game_store = new GameStore();
		return { game: this.game_store.current() };
	},
	handleEvent: function(payload) {
		if (payload.action === 'new_state')
			this.setState({ game: payload.state });
	},
	componentDidMount: function() {
		var self = this;
		this.dispatchCallback = Dispatcher.register( this.handleEvent );
	},
	componentWillUnmount: function() {
		Dispatcher.unregister(this.dispatchCallback);
		if (this.game_store)
			this.game_store.destroy();
	},
	newGame: function() {
		Dispatcher.dispatch({ action: 'new_game' });
	},
	render: function() {
		var game = this.state.game;

		return <div className="game">
			<Winner game={game} />
			<Board game={game}/>

			<button type="button" onClick={this.newGame}>New Game</button>
		</div>
	}
})
