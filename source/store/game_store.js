var Dispatcher = require('../dispatcher/game_dispatch.js');
var GameState = require('../lib/game_state.js');
var WOPR = require('../lib/wopr');

module.exports = (function() {
	function T2ToeStore() {
		this.current_state = new GameState();
		this.dispatch_token = Dispatcher.register(this.handleEvent.bind(this));
	};

	T2ToeStore.prototype.destroy = function() {
		Dispatcher.unregister(this.dispatch_token);
	};

	T2ToeStore.prototype.handleEvent = function(payload)  {
		// Set timeout is used here so that these actions can dispatch other events
		if (payload.action == 'new_game')
			setTimeout( this.newGame.bind(this), 1 );

		if (payload.action == 'move') {
			setTimeout( this.playerMove.bind(this), 1, payload.square );
		}

		// Add a little bit of a delay before having the robot move
		// so that user can see their own move on its own.
		if (payload.action == 'robot_move')
			setTimeout( this.robotMove.bind(this), 250);
	};

	T2ToeStore.prototype.current = function() {
		return this.current_state;
	};

	T2ToeStore.prototype.newGame = function() {
		this.updateState( new GameState() );
	};

	T2ToeStore.prototype.updateState = function(state) {
		this.current_state = state;
		Dispatcher.dispatch({ action: 'new_state', state: state });
	};

	T2ToeStore.prototype.playerMove = function(square) {
		var cur = this.current()
		if (cur.player() !== 1) return; // TODO show message

		try {
			var next = cur.move(square);
			this.updateState( next );

			Dispatcher.dispatch({ action: 'robot_move' });
		}
		catch (err) {} // TODO display error
	};

	T2ToeStore.prototype.robotMove = function() {
		var cur = this.current();
		if (cur.winner()) return;

		this.updateState( WOPR.move(cur) );
	};

	return T2ToeStore;
})();
