var T2Toe;

T2Toe = (function() {
	function T2Toe(board, player) {
		this._player = player || 1;
		this.board = [
			0,0,0,
			0,0,0,
			0,0,0,
		];

		if (board) {
			for( var i = 0; i < board.length; ++i ) {
				this.board[i] = board[i];
			}
		}
	};

	T2Toe.prototype.player = function() {
		return this._player;
	};

	T2Toe.prototype.next_player = function() {
		return 3 - this._player;
	}

	T2Toe.prototype.available_spaces = function() {
		var avail = [];
		for( var i = 0; i < 9; ++i ) {
			if (!this.board[i])
				avail.push(i);
		}
		return avail;
	}

	var space = T2Toe.prototype.space = function(r, c) {
		if(typeof c === 'undefined') {
			if(r < 0 || r >= 9) throw "Invalid space (" + r + ")";
			return r;
		}
		if (r < 0 || r > 2) throw "Invalid row (" + r + ")";
		if (c < 0 || c > 2) throw "Invalid column (" + c + ")";
		return (r * 3) + c;
	};

	T2Toe.prototype.owner = function(r, c) {
		return this.board[ this.space(r, c) ];
	};

	T2Toe.prototype.move = function(r, c) {
		if( this.owner(r,c) != 0 ) {
			throw "Space is already taken";
		}
		var n = new T2Toe(this.board,this._player);
		n._move(r,c);
		return n;
	};

	T2Toe.prototype._move = function(r, c) {
		this.board[this.space(r, c)] = this._player;
		this._player = this.next_player();
		return this;
	};

	T2Toe.prototype.winning_combinations = (function () {
		var r = [];
		var i;

		// horizontal
		for(i = 0; i < 3; ++i)
			r.push([ space(i,0), space(i,1), space(i,2) ]);

		// vertical
		for(i = 0; i < 3; ++i)
			r.push([ space(0,i), space(1,i), space(2,i) ]);

		// diagonals
		r.push([ space(0,0), space(1,1), space(2,2) ]);
		r.push([ space(0,2), space(1,1), space(2,0) ]);

		return r;
	})();

	T2Toe.prototype.winner = function() {
		var winner = 0;
		this.winning_combinations.every(function(spaces) {
			var o = this.owner(spaces[0]);
			if(o && o === this.owner(spaces[1]) && o === this.owner(spaces[2])) {
				winner = o;
				return false; // stop iteration
			}
			return true; // continue iterating
		}, this);

		return winner;
	}

	return T2Toe;

})();

module.exports = T2Toe;
