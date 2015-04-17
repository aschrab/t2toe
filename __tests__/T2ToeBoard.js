'use strict';

jest.dontMock('../source/game.js');
var T2ToeBoard = require('../source/game.js');

describe('T2ToeBoard', function() {
	describe('move', function() {
		it('move sets owner of square', function() {
			var game = new T2ToeBoard();
			game = game.move(0,0);
			expect(game.owner(0,0)).toBe(1)
		});
		it("move doesn't modify original object", function() {
			var game = new T2ToeBoard();
			game.move(0,0);
			expect(game.owner(0,0)).toBe(0)
			expect(game.player()).toBe(1);
		});
		it('throws exception if square is already taken', function() {
			var game = new T2ToeBoard();
			expect( function(){game.move(0,0).move(0,0)} ).toThrow;
		});
	});

	describe('winner', function() {
		it('finds no winner for new game', function() {
			var game = new T2ToeBoard();
			expect(game.winner()).toBe(0);
		});
		it('finds winner on top row', function() {
			var game = new T2ToeBoard([1,1,1]);
			expect(game.winner()).toBe(1);
		});
		it('finds winner on middle row', function() {
			var game = new T2ToeBoard([0,0,0,2,2,2]);
			expect(game.winner()).toBe(2);
		});
		it('finds winner on bottom row', function() {
			var game = new T2ToeBoard([0,0,0,0,0,0,2,2,2]);
			expect(game.winner()).toBe(2);
		});

		it('finds winner in left column', function() {
			var game = new T2ToeBoard([
				2,0,0,
				2,0,0,
				2,0,0
			]);
			expect(game.winner()).toBe(2);
		})
		it('finds winner in middle column', function() {
			var game = new T2ToeBoard([
				0,1,0,
				0,1,0,
				0,1,0
			]);
			expect(game.winner()).toBe(1);
		})
		it('finds winner in right column', function() {
			var game = new T2ToeBoard([
				0,0,1,
				0,0,1,
				0,0,1
			]);
			expect(game.winner()).toBe(1);
		})

		it('finds winner TL to BR', function() {
			var game = new T2ToeBoard([
				1,0,0,
				0,1,0,
				0,0,1
			]);
			expect(game.winner()).toBe(1);
		})

		it('finds winner BL to TR', function() {
			var game = new T2ToeBoard([
				0,0,2,
				0,2,0,
				2,0,0
			]);
			expect(game.winner()).toBe(2);
		})

		it('finds no winner for draw', function() {
			var game = new T2ToeBoard([
				1,1,2,
				2,2,1,
				1,2,1
			]);
			expect(game.winner()).toBe(0);
		})
	});
});
