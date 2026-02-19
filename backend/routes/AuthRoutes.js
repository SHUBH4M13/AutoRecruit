import express from "express"
import authenticateJWT from "../middleware/jwt.js"
import { handleSendOTP , handleVerifyOTP} from "../controllers/Otp.js"
import {handleSignup , handleLogin} from "../controllers/Auth.js"
import HandleGoogleLogin from "../controllers/Auth.js"
import HandleGoogleCallback from "../middleware/OAuth.js"

const AuthRouter = express.Router()

AuthRouter
.post("/signup" , handleSignup )
.post("/login" , handleLogin )
.get("/auth/google" , HandleGoogleLogin ) //it will start googlelogin
.get("/auth/google/callback" , HandleGoogleCallback)