
function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).json({ success: false, error: 'Server error!!!' });
}

module.exports = errorHandler;