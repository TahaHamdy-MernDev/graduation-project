
const User = require("../models/userModel");
const dbService = require("../utils/dbService");
const asyncHandler = require("../utils/asyncHandler");
const { createSendToken } = require("../utils/createSendToken");

exports.registerCtrl = asyncHandler(async (req, res) => {
  const emailInUse = await dbService.findOne(User, { email: req.body.email });

  if (emailInUse) {
    console.log(":ffffffffffffffff");
    return res.badRequest({ message: "Email is already in use." });
  }
 const user =await dbService.create(User,{...req.body});
 console.log(user);

  res.success({ message: "Account successfully created. Please login." });
});

exports.loginCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await dbService.findOne(User, { email });

  if (!userExist) {
    return res.badRequest({ message: "Don't have an account? Please sign up." });
  }
if(userExist.ssoAuth.googleId){
  return res.badRequest({ message: "قم بتسجيل الدخول باستخدام البريد الاليكترونى" });
}
  const matchPassword = await userExist.comparePassword(password); 

  if (!matchPassword) { 
    return res.badRequest({
      message: "Incorrect password. Please check your password and try again.",
    });
  }

  createSendToken(userExist, 200, res);
});

exports.currentUserCtrl = asyncHandler(async (req, res) => {
  const userExist = await dbService.findOne(User, { _id: req.user._id });
  if (!userExist) {
    return res.badRequest({ message: "Don't have an account? Please sign up." });
  }
  res.success({ data: userExist });
});
exports.logOutCtrl = asyncHandler(async (req, res) => {
  req.session.destroy((sessionErr) => {
      if (sessionErr) {
        console.error('Session destroy error', sessionErr);
        return res.status(500).json({ success: false, message: 'Logout failed' });
      }})
  res.clearCookie("jwt")
  // res.success()
  const clientUrl = req.headers.origin || req.headers.referer;
  res.redirect(`${clientUrl}register`);
});

