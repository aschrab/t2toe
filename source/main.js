require('./styles/main.scss');

var React = window.React = require('react')
var Board = require('./component/board')

React.render(<Board />, document.getElementById('content'))
