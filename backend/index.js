import express from "express"
import http from "http"
import dotenv from "dotenv"
import UserRouter from "./routes/UserRoute.js"
import DatabaseConnect from "./DatabaseConnect.js"

//import getEmbeddings from "./controllers/OpenAIEmbeddings.js"
import ComputeCosineSimilarity from "./controllers/Score.js"
import { Embeddings } from "openai/resources/embeddings.js"

dotenv.config()

const app = express();
const PORT = 8069

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}))


DatabaseConnect('mongodb://127.0.0.1:27017/AutoRecruit')

app.use("/" , UserRouter );

const resumeTxt = `EDUCATION
MIT ADT University Pune
Bachelor of Technology in Computer Science — CGPA: 8.38/10 Aug 2023 – Present
TECHNICAL SKILLS
Programming Languages: C/C++, JavaScript, Typescript
Frameworks & Libraries: React , Node.js, Express.js, Tailwind CSS
Developer Tools: Git, GitHub, VS Code, Postman ,
Databases: MySQL, MongoDB , Postgres
EXPERIENCE
LearnCraft Engineering Live Site
• Worked as a React.js Intern, creating a responsive frontend website to showcase Shivmala Infra projects and
services.
• Designed visually appealing and responsive interfaces using React.js, Tailwind CSS, and Framer Motion, enhancing
user interaction.
• Optimized performance and SEO by implementing lazy loading of components.
• Deployed the site on Vercel and configured a custom domain using BigRock.
PROJECTS
LabelX – AI-Based Food Safety Analyzer labelx.vercel.app
• Engineered a full-stack AI-powered platform that scans packaged food labels to detect potentially harmful ingredients.
• Integrated Tesseract OCR for text extraction and Llama LLM to generate health summaries.
• Constructed secure backend services using Node.js, Express, MongoDB with JWT authentication and
NodeMailer.
• Used Multer and Cloudinary for efficient image upload and storage.
• Created frontend with React and Tailwind CSS for clear, user-friendly insights.
PrepX - Defence Exam Preparation Platform prep-x-blush.vercel.app
• Constructed an online platform for NDA, CDS, and AFCAT exam preparation.
• Designed and implemented responsive UI with React.js and Tailwind CSS.
• Engineered backend with Spring Boot, providing authentication, test management, and user data handling.
• Integrated MongoDB for efficient question storage and retrieval.
• Constructed RESTful APIs for seamless frontend-backend communication.
Henosis – Employee Management System • Created a role-based employee management web app using MERN stack to streamline operations.
• Implemented JWT authentication, OTP verification, and automated welcome emails.
• Integrated WebSocket chat and modular project management for collaboration.
• Enabled HR onboarding with role-based access and employee profile viewing.
Ongoing
LEADERSHIP & EXTRACURRICULAR ACTIVITIES
Data Structures & Algorithms - LeetCode
• Solved 300+ problems on LeetCode covering data structures & algorithms.
ACES Club - Technical Member
• Led ACES Club website frontend development.`

const jdtxt = `Roles & Responsibilities

Design, develop, and optimize data ingestion and transformation pipelines using Python.

Apply OOP principles to build modular, maintainable, and reusable data components.

Work with distributed systems (e.g., Hadoop/Spark) for processing large-scale datasets.

Develop and enforce data quality, testing, and validation frameworks.

Collaborate with analysts, data scientists, and product teams to ensure data availability and reliability.

Participate in code reviews, CI/CD workflows, and infrastructure automation to maintain high engineering standards.

Contribute to ongoing evolution of data architecture and help integrate with cloud-based data ecosystems.

Technical Skills

Core Expertise

Python Programming

Strong grasp of object-oriented design, modular code practices, and design patterns.

Experience with libraries/frameworks such as pandas, PySpark, dask, or custom ETL frameworks.

Proficiency in writing unit-tested, well-documented, and scalable code (pytest, unittest).

Data Engineering & Ecosystem

Experience in building and maintaining ETL/ELT pipelines using Python.

Exposure to Hadoop or Spark ecosystems for distributed data processing.

Solid understanding of SQL and working with relational or analytical databases (e.g., PostgreSQL, Redshift).

Familiarity with CI/CD pipelines (Jenkins, GitHub Actions) and Infrastructure as Code (Terraform).

Basic exposure to AWS data services like S3, Lambda, Step Functions, Glue, or DynamoDB.

Qualifications

Bachelor’s or master’s degree in engineering or technology or related field.

3–6 years of hands-on experience in data engineering or backend development.`

server.listen( PORT , async () => {
    console.log(`BACKEND Server started at : ${PORT}`)

    // OPENAI Embeddings
    // const ResumeVec = getEmbeddings(resumeTxt)
    // const jdVec = getEmbeddings(jdtxt)

    //const score = await ComputeCosineSimilarity(resumeTxt , jdtxt )
    //console.log(score)
    
})