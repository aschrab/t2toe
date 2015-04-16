'use strict';

jest.dontMock('../source/game.js');
var T2ToeBoard = require('../source/game.js');

describe('T2ToeBoard', function() {
	describe('move', function() {
		it('move sets owner of square', function() {
			var game = new T2ToeBoard();
			game.move(0,0);
			expect(game.owner(0,0)).toBe(1)
		});
		it('throws exception if square is already taken', function() {
			var game = new T2ToeBoard();
			game.move(0,0);
			expect( function(){game.move(0,0)} ).toThrow;
		});
	});
});
