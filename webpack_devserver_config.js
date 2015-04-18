config_maker = require('./util/make_webpack_config.js');
config = config_maker({ devel: true });
module.exports = config;
