const createHttpError = require('http-errors');

const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return next(createHttpError(401, "Please login to access this resource"));
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return next(createHttpError(403, "Access denied. Admin only resource"));
  }
  next();
};

module.exports = { isAuthenticated, isAdmin }; 