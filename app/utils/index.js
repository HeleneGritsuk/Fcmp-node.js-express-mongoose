module.exports = function() {
  return function(req, res, next) {
      // isAuthenticated is set by `deserializeUser()`
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      next({message: 'You need to be authenticated to access this page!'})
    } else {
        next()
    }
  }
}
