'use strict';

jest.dontMock('../source/lib/game.js');
jest.dontMock('../source/lib/wopr.js');
var Game = require('../source/lib/game.js');
var WOPR = require('../source/lib/wopr.js');

describe('WOPR', function() {
	it('is unbeatable when it goes second', function() {
		var game = new Game();
		var losses = [];
		var checked = {};

		var turn = function(g) {
			// Don't recheck board states
			if(checked[g]) return;
			checked[g] = true;

			var avail = g.available_spaces();
			// Check for stalemate
			if (avail.length == 0) return;

			return avail.forEach(function(space) {
				var next = g.move(space);
				if (next.winner() == 1) { console.log(g._history); return; }
				next = WOPR.move(next);
				if (next.winner() == 2) { return; }

				turn(next);
			});
		};

		turn(game);
		expect(losses.length).toBe(0);
	});
});
