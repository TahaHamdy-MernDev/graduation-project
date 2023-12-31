const {
  registerCtrl,
  loginCtrl,
  currentUserCtrl,
  logOutCtrl,
} = require("../controllers/authController");
// const jwt =require("jsonwebtoken")
const User = require("../models/userModel");
const { authenticate } = require("../middleware/auth");
const { createSendToken } = require("../utils/createSendToken");
const dbService = require("../utils/dbService");
const { validate } = require("../utils/validate");
const {
  registerSchema,
  loginSchema,
} = require("../utils/validation/authValidation");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = require("express").Router();
router.post("/register", validate(registerSchema), registerCtrl);
router.post("/login", validate(loginSchema), loginCtrl);
router.post("/current-user", authenticate, currentUserCtrl);
router.get("/logout", authenticate, logOutCtrl);
router.get("/google/error", (req, res) => {
  res.loginFailed({ message: "Login Failed" });
});
const CLIENT_URL = process.env.CLIENT_URL;
router.get(
  "/google/signin",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "/google/error",
    scope: ["profile", "email"],
  })
);

router.get("/google/success", (req, res) => {
  createSendToken(req.user, 200, res);
});
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const signToken = (id) =>
      jwt.sign({ _id: id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
    const token = signToken(req.user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    }; 
    res.cookie("jwt", token, cookieOptions);
    res.redirect(`${CLIENT_URL}`);
  }
); 

module.exports = router;
