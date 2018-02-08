const blogs = require('./blogs');
const auth = require('./auth');
const isLoggedIn = require('../server.js');
const ensureLoggedIn = require('../utils/index.js');

module.exports = function(app) {

  app.use('/', auth);
  app.use('/blogs',ensureLoggedIn(), blogs);

}
