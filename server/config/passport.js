import "dotenv/config";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import crypto from "crypto";

import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value
          ?.trim()
          .toLowerCase();

        const name =
          profile.displayName ||
          profile.name?.givenName ||
          "Google User";

        const avatar =
          profile.photos?.[0]?.value || "";

        if (!email) {
          return done(
            new Error("Google account email was not provided")
          );
        }

        // Check whether the user already exists
        let user = await User.findOne({ email });

        // Create account if it doesn't exist
        if (!user) {
          const randomPassword = crypto
            .randomBytes(32)
            .toString("hex");

          user = await User.create({
            name,
            email,
            password: randomPassword,
            avatar,
            role: "user",
          });
        } else {
          // Update Google avatar if available
          if (avatar && user.avatar !== avatar) {
            user.avatar = avatar;
            await user.save();
          }
        }

        return done(null, user);
      } catch (error) {
        console.error("GOOGLE STRATEGY ERROR:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;