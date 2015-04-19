var React = require('react');
var Square = require('./square');
var Dispatcher = require('../dispatcher/game');

module.exports = React.createClass({
	displayName: 'T2ToeWinner',
	render: function() {
		var game = this.props.game;
		var winner = game.winner();
		if ( !winner ) return <span/>;

		return (
			<div className="winner">
				<div className="content">
					<h2>Winner</h2>
					<Square owner={winner}/>

					<br/>
					<button type="button" onClick={this.newGame}>New Game</button>
				</div>
			</div>
		)
	},
	newGame: function () {
		Dispatcher.dispatch({ action: 'newGame' });
	}
})
