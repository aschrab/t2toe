require('./styles/main.scss');

var React = window.React = require('react')
var Game = require('./component/game')

React.render(<Game />, document.getElementById('content'))
