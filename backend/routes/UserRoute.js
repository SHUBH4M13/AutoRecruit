import express from "express"
import { handleSignup, handleLogin } from "../controllers/User.js"
import upload from "../middleware/Upload.js";
import { handleUploadResume } from "../controllers/resume.js"
import authenticateJWT from "../middleware/jwt.js"

const UserRouter = express.Router();

UserRouter
.post("/signup" , handleSignup )
.post("/login" , handleLogin )
.post("/post-resume" , authenticateJWT , upload.single("resume") , handleUploadResume);


export default UserRouter