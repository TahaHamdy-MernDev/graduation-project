const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const dbService =require("../utils/dbService")
const authenticate = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (!token) return res.unAuthorized();
  const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
  const freshUser = await dbService.findOne(User, { _id: decoded._id });
  if (!freshUser)
    return res.recordNotFound({
      error: "The user belonging to this token does no longer exist",
    });
  req.user = freshUser;
  next();
};

const authorizeRoles = (allowedRole) => (req, res, next) => {
  authenticate(req, res, () => {
    const hasMatchingRole = req.user.role === allowedRole;
    if (hasMatchingRole) {
      next(); 
    } else {
      res.status(403).json({
        success: false,
        error:
          "Access forbidden: You do not have the necessary role(s) to access this resource.",
      });
    }
  });
};

module.exports = {
  authenticate,
  authorizeAdmin: authorizeRoles("Admin"),
};
