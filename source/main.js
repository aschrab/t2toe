require('./styles/main.scss');

var React = window.React = require('react')
var Board = require('./board')

React.render(<Board />, document.getElementById('content'))
