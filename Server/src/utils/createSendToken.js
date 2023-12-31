const jwt = require("jsonwebtoken");
const signToken = (id) =>
  jwt.sign({ _id: id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res, clientUrl) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  if (clientUrl) {
    res.redirect(clientUrl);
  } else {
    const responseData = {
      success: true,
      token,
      data: {
        user,
      },
    };
    res.status(statusCode).json(responseData);
  }
};

module.exports = { createSendToken };
