const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { DBError } = require("../utils/error");

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.cookies["access-token"];
    if (accessToken === undefined) throw new Error("Token not found!");
    const loggedUser = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.fetchUser(loggedUser);
    if (user === undefined) throw new DBError("user not found");
    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof DBError) {
      next(error);
    } else {
      res.redirect("/refresh");
    }
  }
};
