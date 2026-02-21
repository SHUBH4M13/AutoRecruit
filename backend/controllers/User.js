import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import axios from "axios";
import pdf from "pdf-parse";
import client from "../Config/GenAi.js";

/*, TODOs: 1. handleAccDelete broken 
 async function handleAccDelete(req, res) {
//   const { email, password } = req.user.userId;

//   if (!email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "user not found",
//     });
//   }

//   try {
//     const normalEmail = email.toLowerCase();

//     const isExist = await UserModel.findOne({ email: normalEmail });

//     if (!isExist) {
//       return res.status(404).json({
//         success: false,
//         message: "user not found",
//       });
//     }

//     const compare = bycrpt.compare(password, isExist.password);
//     const isDeleted = false;

//     if(compare){
//       isDeleted = await UserModel.deleteOne({ email: normalEmail });
//     }

//     if (isDeleted) {
//       return res.status(200).json({
//         success: true,
//         message: "user deleted",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "server error",
//     });
//   }
} */
// handleChangePassword = Forget password implementation

async function handleChangePassword(req, res) {
  const { password, new_password } = req.body;

  try {
    const UserID = req.user.userId;

    const isExist = await UserModel.findById({ UserID });

    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isCompare = bcrypt.compare(password, isExist);

    if (!isCompare) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    await UserModel.findByIdAndUpdate(UserID, {
      password: new_password,
    });

    return res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    console.error("Failed to Change Password:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function handleGetUserResume(req, res) {
  const userId = req.user.userId;

  try {
    const user = await UserModel.findById({ userId });

    const ResumeLink = user.ResumeLink;

    //get user resume
    const response = await axios.get(ResumeLink, {
      responseType: "arraybuffer",
    });

    const pdfBuffer = Buffer.from(response.data, "binary");
    //converting
    const data = await pdf(pdfBuffer);

    return data;
  } catch (error) {
    console.error("Failed to Get Suggestion:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function handleGetAISuggestion(req, res) {
  try {
    const JDText = req.body;
    const ResumeText = await handleGetUserResume();

    const prompt = `You are an AI system that improves a user's resume so that it matches a given Job Description (JD) more closely. 
    Your goal is to help the user increase the semantic similarity / cosine similarity score between their resume and the JD.
    
    You will receive:
    1. Resume text
    2. Job Description text
    
    Your tasks:
    - Identify important skills, responsibilities, tools, keywords, and experience from the JD that are missing or weak in the resume.
    - Suggest improvements to the resume.
    - DO NOT rewrite the whole resume. Only give targeted suggestions.
    - Keep suggestions realistic and relevant (do NOT lie or add false experience).
    
    Your response MUST be in the following JSON-like structure (arrays of objects):
    
    Example Output Format:
    
    [
      {
        "resumeText": "No mention of React Hooks",
        "improvement": "JD emphasizes React Hooks. Add a point under your experience showing use of useState, useEffect, or custom hooks."
      },
      {
        "resumeText": "Backend responsibilities missing",
        "improvement": "JD mentions REST API development. Add a bullet like: 'Built and integrated REST APIs using Node.js and Express.'"
      }
    ]
    
    Now use this exact format and generate suggestions.
    
    Resume:
    ${ResumeText}
    
    Job Description:
    ${JDText}`

    const response = client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      max_completion_tokens: 500,
      verbosity: "low",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    });

    console.log(response);

    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.error("Failed to get Ai Suggestion:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export { handleGetUserResume, handleChangePassword , handleGetAISuggestion};