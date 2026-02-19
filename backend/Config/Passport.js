import Jwt from "jsonwebtoken"
import passport from "passport"
import dotenv from "dotenv"
import UserModel from "../models/UserModel"

dotenv.config()

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
      },
      async (profile, done) => {
        try {
          const email = profile.emails[0].value;
          const name = profile.displayName;
          
          let user = await UserModel.findOne({ email });
  
          if (!user) {
            user = await UserModel.create({
              fullName: name,
              email: email,
              isVerified: true
            });
          }
  
          const token = Jwt.sign({ email: email }, process.env.JWT_KEY, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
  
          done(null,{ user , token});
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
  
