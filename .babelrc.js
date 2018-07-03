// I think other modules are trying to use this because they haven't been updated to deal with the
// newer `babel.config.js` file. So, we'll just re-export that.
const config = require('./babel.config.js');
module.exports = config();
