import express from "express"
import http from "http"
import dotenv from "dotenv"
import mongoose from "mongoose"
import DatabaseConnect from "./DatabaseConnect.js"

dotenv.config()

const app = express();
const PORT = 8069

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}))


DatabaseConnect('mongodb://127.0.0.1:27017/AutoRecruit')

server.listen( PORT , () => {
    console.log(`BACKEND Server started at : ${PORT}`)
})