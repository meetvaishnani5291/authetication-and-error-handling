const {
  ValidationError,
  AutenticationError,
  DBError,
} = require("../utils/error");

module.exports = (error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.isLoggedin = false;
  if (error instanceof AutenticationError) {
    res.status(401).render("login");
  } else if (error instanceof ValidationError) {
    res.status(403).render("register");
  } else if (error instanceof DBError) {
    res.status(404).render("login");
  } else {
    res.status(503).render("500");
  }
};
