import express from "express"
import authenticateJWT from "../middleware/jwt.js";
import { handleParseResume } from "../controllers/resume.js"
import { handleGetAISuggestion } from "../controllers/User.js"
import ComputeCosineSimilarity from "../controllers/Score.js"
import upload from "../middleware/Upload.js"
const ScoreRouter = express.Router();

ScoreRouter
.post("/upload" , upload.single("file") , handleParseResume)
.get("/suggestions" , handleGetAISuggestion )
.post("/getscore" , upload.single("file") , handleParseResume , ComputeCosineSimilarity , handleGetAISuggestion )

export default ScoreRouter