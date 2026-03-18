import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import passport from "passport";

async function handleSignup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalEmail = email.toLowerCase();

    const isExist = await UserModel.findOne({ email: normalEmail });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      fullName,
      email: normalEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalEmail = email.toLowerCase();

    const isExist = await UserModel.findOne({ email: normalEmail });
    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, isExist.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }

    const token = Jwt.sign(
      { userId: isExist._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: "Logged IN",
      token,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// Google Auth
export const HandleGoogleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/login",
  session: false,
});

export { handleSignup, handleLogin };