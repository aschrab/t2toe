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

	WOPR.take_opposing_corner = function (game) {
		var opp = game.next_player();
		var next;

		[ [0,2], [2,8], [6,8], [0,6] ].every(function(pair) {
			if (game.owner(pair[0]) == opp && !game.owner(pair[1]))
				next = game.move(pair[1]);
			else if (game.owner(pair[1]) == opp && !game.owner(pair[0]))
				next = game.move(pair[0]);
			return !next;
		});

		return next;
	}

	WOPR.take_first_corner = function (game) {
		[0,2,6,8].every(function(space) {
			try {
				game = game.move(space);
				return false;
			}
			catch(err) {
				return true;
			}
		});
		return game;
	}

	WOPR.take_center_if_available = function (game) {
		try {
			return game.move(1,1);
		}
		catch (err) {
		}
	};

	WOPR.take_best_blocker = function (game) {
		var opp = game.next_player();
		var scores = {};

		var possible = game.winning_combinations.filter(function(line) {
			// Filter out combinations that are no longer achievable
			return !line.some(function(space) { return game.owner(space) === opp })
		});

		possible.forEach(function(line) {
			line.forEach(function(space) {
				// count possible winning combinations for each available space
				if (!game.owner(space))
					scores[space] = (scores[space] || 0) + 1
			})
		});

		var next;
		var keys = Object.keys(scores);
		keys = keys.sort(function(a,b){a-b});
		keys.some(function(space) {
			try { next = game.move(space) } catch (err) {}
			return next;
		});

		return next;
	}

	WOPR.threaten_win = function (game) {
		var me = game.player();
		var next;
		game.winning_combinations.every(function(line) {
			var avail = -1;
			var taken = 0;
			var mine = 0;

			line.forEach(function(space) {
				var owner = game.owner(space);
				if (!owner) {
					avail = space;
				}
				else {
					taken++;
					if (owner === me)
						mine++;
				}
			});

			if (taken === 1 && mine === 1) {
				next = game.move(avail);
				return false; // stop looking
			}

			return true; // continue
		});

		return next;
	};

	WOPR.block_fork = function (game) {
		var opp = game.next_player();

		// this only applies on the third move
		if (game.available_spaces().length != 6) return;

		if (
			(opp === game.owner(0,0) && opp === game.owner(2,2)) ||
			(opp === game.owner(0,2) && opp === game.owner(2,0))) {
			return game.move(0,1);
		}
	}

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
		WOPR.take_best_blocker,
		WOPR.threaten_win,
		WOPR.block_fork,
		WOPR.take_opposing_corner,
		WOPR.take_first_corner,
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

