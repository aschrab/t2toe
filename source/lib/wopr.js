'use strict';

module.exports = (function() {
	var WOPR = {};

	WOPR.min_max = function (game) {
		if (game.available_spaces().length === 0) return;
		var min_max = function(g) {
			var scores = {};
			var moves = g.available_spaces();
			if (moves.length === 0) return [null,0];
			moves.forEach(function(space) {
				var n = g.move(space);
				var w = n.winner();
				if (w === g.player()) { scores[space] = 10 }
				else if (w) { scores[space] = -10 }
				else { scores[space] = -0.9 * min_max(n)[1] }
			});

			var m = Object.keys(scores).sort(function(a,b){return scores[b]-scores[a]}).shift();
			return [ m, scores[m] ];
		};

		var move = min_max(game)[0];
		if (move)
			return game.move( move );
	};

	WOPR.move = function(game) {
		var next_state;
		next_state = WOPR.min_max(game);
		return next_state || game; // Return next state or current if nothing was found
	};

	return WOPR;
})();

