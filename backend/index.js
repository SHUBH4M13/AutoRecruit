import express from "express"
import http from "http"
import dotenv from "dotenv"

import UserRouter from "./routes/UserRoute.js"
import AuthRouter from "./routes/AuthRoutes.js"
import ScoreRouter from "./routes/Score.js"

import DatabaseConnect from "./DatabaseConnect.js"
import cors from "cors"

//import getEmbeddings from "./controllers/OpenAIEmbeddings.js"
import ComputeCosineSimilarity from "./controllers/Score.js"
import { Embeddings } from "openai/resources/embeddings.js"

dotenv.config()

const app = express();
const PORT = 8069

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(cors());

DatabaseConnect('mongodb://127.0.0.1:27017/AutoRecruit')

app.use("/auth" , AuthRouter);
app.use("/user" , UserRouter);
app.use("/score" , ScoreRouter)


server.listen( PORT , async () => {
    console.log(`BACKEND Server started at : ${PORT}`)

    // OPENAI Embeddings
    // const ResumeVec = getEmbeddings(resumeTxt)
    // const jdVec = getEmbeddings(jdtxt)

    //const score = await ComputeCosineSimilarity(resumeTxt , jdtxt )
    //console.log(score)
    
})