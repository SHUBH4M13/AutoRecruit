import openai from "openai"
import dotenv from dotenv

dotenv.config();

const client = new openai({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
})

export default client

