const User = require("../models/userModel");
const { createSendToken } = require("../utils/createSendToken");
const dbService = require("../utils/dbService");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const googlePassportStrategy = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);    
  });
  passport.deserializeUser(async (id, done) => {
    const user = await dbService.findOne(User, { "ssoAuth.googleId": id });
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/api/v1/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        let userObj = { 
          ssoAuth: { googleId: profile.id },
          username: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
        };
        const existingUser = await User.findOne({ 
          "ssoAuth.googleId": profile.id,
        });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await dbService.create(User, userObj);
        return done(null, user);
      }
    )
  );
};
module.exports = { googlePassportStrategy };
