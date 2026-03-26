import express from "express";
import upload from "../middleware/Upload.js";
import { handleUploadResume } from "../controllers/resume.js";
import authenticateJWT from "../middleware/jwt.js";
import { handleGetUserInfo , handlen8ncall } from "../controllers/User.js";

const UserRouter = express.Router();

UserRouter
.get("/me", handleGetUserInfo)
.get("/jobs" , handlen8ncall);

export default UserRouter;
