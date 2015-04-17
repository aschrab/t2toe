'use strict';

module.exports = (function() {
	var WOPR = {};

	WOPR.complete_line = function (game, player) {
		var next_game;
		game.winning_combinations.every(function(line) {
			var empty = -1;
			var taken = 0;
			line.forEach(function(space) {
				var o = game.owner(space);
				if (o === 0) empty = space;
				if (o === player) taken++;
			});

			if (taken === 2 && empty >= 0) {
				next_game = game.move(empty);
				return false; // stop iterating
			}
			return true; // continue
		});

		return next_game;
	};

	WOPR.win_if_possible = function (game) {
		return WOPR.complete_line(game, game.player());
	}

	WOPR.block_opponent = function (game)  {
		return WOPR.complete_line(game, game.next_player());
	}

	WOPR.take_center_if_available = function (game) {
		try {
			return game.move(1,1);
		}
		catch (err) {
		}
	};

	WOPR.take_first_available_space = function (game) {
		var i;
		for( i = 0; i < 9; ++i ) {
			if (game.owner(i) == 0) {
				return game.move(i);
			}
		}
	};

	WOPR.strategies = [
		WOPR.win_if_possible,
		WOPR.block_opponent,
		WOPR.take_center_if_available,
		WOPR.take_first_available_space
	];

	WOPR.move = function(game) {
		var next_state;
		WOPR.strategies.every(function(strategy) {
			next_state = strategy(game);
			return !next_state; // Stop iterating once a move is found
		})
		return next_state || game; // Return next state or current if nothing was found
	};

	return WOPR;
})();

