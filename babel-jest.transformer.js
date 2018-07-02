const config = require('./babel.config');
module.exports = require('babel-jest').createTransformer(config());
