import passport from "passport";
import dotenv from "dotenv"

dotenv.config()

function HandleGoogleCallback (req, res, next){
    passport.authenticate(
      "google",
      { session: false, failureRedirect: "/login" },
      (err, data) => {
        if (err || !data) {
          return res.send(err);
        }
        const { user, token } = data;
        res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
      }
    )(req, res, next);
};

export default HandleGoogleCallback