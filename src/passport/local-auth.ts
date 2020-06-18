import passport from "passport";
import * as passportLocal from "passport-local";

// import * as User from "../models/user";
const User = require("../models/user");

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = User.findOne({ email: email });

      if (user) {
        return done(
          null,
          false,
          req.flash("signupMessage", "The Email is already taken.")
        );
      } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);
