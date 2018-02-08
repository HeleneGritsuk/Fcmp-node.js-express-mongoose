exports.errorHandler = (err, req, res, next) => {
  res.status(500);
  res.render('error', { error: err.message });
}
exports.notFoundHandler = (req, res) => {
    res.render('404');
}
