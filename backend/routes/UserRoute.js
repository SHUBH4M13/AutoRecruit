import express from "express"
import { handleSignup, handleLogin } from "../controllers/User.js"

const UserRouter = express.Router();

UserRouter
.post("/signup" , handleSignup )
.post("/login" , handleLogin )
.post("/post-resume" , )


export default UserRouter