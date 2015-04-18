var React = require('react');

module.exports = React.createClass({
	render: function() {
		var wargames = "http://www.imdb.com/title/tt0086567/";
		var chess = <a href="http://www.chess.com">chess</a>;
		return (
			<div>
				<p>
					<a href={wargames}>What a strange game.</a>
				</p>
				<p>The only winning move is not to play.</p>
				<p>How about a nice game of {chess}?</p>
			</div>
		)
	}
});

