import express from "express"
import { handleLogin , handleSignup } from "../controllers/User.js"

const UserRouter = express.Router();

UserRouter
.post("/signup" , handleSignup )
.post("/login" , handleLogin )


export default UserRouter