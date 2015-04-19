'use strict';

var score_cache = {};

module.exports = (function() {
	var WOPR = {};

	WOPR.min_max = function (game) {
		if (game.available_spaces().length === 0) return;

		var min_max = function(g) {
			// If best move for this state has already been determined, return it
			if (score_cache[g]) return score_cache[g];

			var moves = g.available_spaces();

			// Handle case of no available spaces
			if (moves.length === 0) return [null,0];

			// Compute a score for each available square
			var scores = {};
			moves.forEach(function(square) {
				// Check what would happen if this square is selected
				var n = g.move(square);
				var w = n.winner();

				// If taking the square results in an immediate win, use score of 10
				if (w === g.player()) { scores[square] = 10 }

				// If taking the square results in an immediate loss (can't happen)
				// use sccore of -10
				else if (w) { scores[square] = -10 }

				// Taking the square doesn't end the game, recursively
				// determine the possible outcomes.  The result needs to be
				// multiplied by a negative since this will be determining the
				// score from the opponent's perspective.  A value less than 1
				// is used so that an eventual win won't score as highly as an
				// immediate win.
				else { scores[square] = -0.9 * min_max(n)[1] }
			});

			// Select the square with the highest score
			var m = Object.keys(scores).sort(function(a,b){return scores[a]-scores[b]}).pop();

			// Return the chosen square along with its score.
			// The score will be used by the recursive caller,
			// the square will be used by the original caller.
			return score_cache[g] = [ m, scores[m] ];
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

