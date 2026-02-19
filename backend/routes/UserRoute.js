import express from "express"
import upload from "../middleware/Upload.js";
import { handleUploadResume } from "../controllers/resume.js"
import authenticateJWT from "../middleware/jwt.js"

const UserRouter = express.Router();

UserRouter
.post("/post-resume" , authenticateJWT , upload.single("resume") , handleUploadResume)
// .post("/forget-password" , sendPasswordResetOTP )
// .post("/forget-password" , sendPasswordResetOTP )


export default UserRouter