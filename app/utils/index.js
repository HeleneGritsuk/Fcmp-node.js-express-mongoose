module.exports = function() {
  return function(req, res, next) {
      // isAuthenticated is set by `deserializeUser()`
      if (!req.isAuthenticated || !req.isAuthenticated()) {
          res.status(401).send({
              success: false,
              message: 'You need to be authenticated to access this page!'
          });
      } else{
          next()
      }
  }
}
