import express from "express"
import authenticateJWT from "../middleware/jwt"
import { handleSendOTP , handleVerifyOTP } from "../controllers/Otp.js"

const OtpRoute = express.Router();

OtpRoute
.get("auth/otp" , handleSendOTP ) // SignUp OTP
.get("/otp" , authenticateJWT , handleSendOTP) 
.get("/otp/verify" , authenticateJWT , handleVerifyOTP) 