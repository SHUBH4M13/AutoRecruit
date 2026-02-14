import express from "express"
import http from "http"
import dotenv from "dotenv"
import mongoose from "mongoose"
import UserRouter from "./routes/UserRoute.js"
import DatabaseConnect from "./DatabaseConnect.js"
import ComputeCosineSimilarity from "./controllers/Score.js"

dotenv.config()

const app = express();
const PORT = 8069

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}))


DatabaseConnect('mongodb://127.0.0.1:27017/AutoRecruit')

app.use("/" , UserRouter );


server.listen( PORT , async () => {
    console.log(`BACKEND Server started at : ${PORT}`)

    //const score = await ComputeCosineSimilarity(resumeTxt , jdTxt )
    
})