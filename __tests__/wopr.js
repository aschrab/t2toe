'use strict';

jest.dontMock('../source/game.js');
jest.dontMock('../source/wopr.js');
var Game = require('../source/game.js');
var WOPR = require('../source/wopr.js');

describe('WOPR', function() {
	it('is unbeatable when it goes second', function() {
		var game = new Game();

		var turn = function(g) {
			var avail = g.available_spaces();
			// Check for stalemate
			if (avail.length == 0) return true;

			return avail.every(function(space) {
				var next = g.move(space);
				if (next.winner() == 1) { return false; }
				next = WOPR.move(next);
				if (next.winner() == 2) { return true; }

				return turn(next);
			});
		};

		expect(turn(game)).toBe(true);
	});
});
