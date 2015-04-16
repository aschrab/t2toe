var T2Toe;

T2Toe = (function() {
	function T2Toe(board, player) {
		this.player = player || 1;
		this.board = board || [
			0,0,0,
			0,0,0,
			0,0,0,
		];
	}

	T2Toe.prototype.player = function() {
		return this.player;
	};

	T2Toe.prototype.space = function(r, c) {
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
		var n = new T2Toe(this.board,this.player);
		n._move(r,c);
		return n;
	};

	T2Toe.prototype._move = function(r, c) {
		this.board[this.space(r, c)] = this.player;
		this.player = 3 - this.player;
		return this;
	};

	T2Toe.prototype.winner = function() {
		var i,o;

		// Check for horizontal winner
		for(i = 0; i < 3; ++i) {
			o = this.owner(i,0);
			if(o && o === this.owner(i,1) && o === this.owner(i,2)) {
				return o; // found a winner
			}
		}

		// Check for vertical winner
		for(i = 0; i < 3; ++i) {
			o = this.owner(0,i);
			if( o && o === this.owner(1,i) && o === this.owner(2,i)) {
				return o; // found a winner
			}
		}

		// Check for diagonal winner
		o = this.owner(1,1);
		if(o) {
			if(o === this.owner(0,0) && o === this.owner(2,2)) {
				return o;
			}

			if(o === this.owner(0,2) && o === this.owner(2,0)) {
				return o;
			}
		}


		return 0;
	}

	return T2Toe;

})();

module.exports = T2Toe;
