var T2Toe;

T2Toe = (function() {
	function T2Toe(board, player, history) {
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

		this._history = (history || []).slice();
	};

	T2Toe.prototype.toString = function() {
		return "T2ToeBoard{" + this._player + ":" + this.board.join(",") + "}";
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

	T2Toe.prototype.owner = function(s) {
		return this.board[ s ];
	};

	T2Toe.prototype.move = function(s) {
		if( this.owner(s) != 0 ) {
			throw new Error("Space is already taken");
		}
		var n = new T2Toe(this.board, this._player, this._history);
		n._move(s);
		return n;
	};

	T2Toe.prototype._move = function(s) {
		this.board[s] = this._player;
		this._history.push(s);
		this._player = this.next_player();
		return this;
	};

	T2Toe.prototype.winning_combinations = (function () {
		var r = [];
		var i;

		var space = function(r, c) { return (r * 3) + c; };

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
		this.winning_combinations.some(function(spaces) {
			var o = this.owner(spaces[0]);
			if(o && o === this.owner(spaces[1]) && o === this.owner(spaces[2])) {
				winner = o;
				return true; // found winner, stop iteration
			}
			return false; // not a winner, continue iterating
		}, this);

		return winner;
	}

	return T2Toe;

})();

module.exports = T2Toe;
