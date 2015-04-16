'use strict';

var React = require('react');

module.exports = React.createClass({
	displayName: 'T2ToeSquare',
	render: function () {
		return <span onClick={this.handleClick} className="square">
			{this.props.owner}
		</span>;
	},
	handleClick: function() {
		this._owner.move(this.props.row, this.props.col);
	}
});
