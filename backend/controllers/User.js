import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import axios from "axios";
import dotenv from "dotenv"
import client from "../Config/GenAi.js";

dotenv.config();

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

async function handleGetAISuggestion(req, res) {
  try {
    const JDText = req.body.jdText;
    const ResumeText = req.resumetext

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
    
    Your response MUST be STRICT VALID JSON.
    Do NOT include any explanation, text, or markdown.
    Return ONLY a JSON array.
    
    Example:
    [
      {
        "resumeText": "...",
        "improvement": "..."
      }
    ]
    
    Now use this exact format and generate suggestions.
    - Only give 3-4 suggestions and give it in sturcutred format array 
    
    Resume:
    ${ResumeText}
    
    Job Description:
    ${JDText}`

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      max_completion_tokens: 500,
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
    })
    
    let raw = response.choices[0].message.content
    
    raw = raw.replace(/```json/g, "").replace(/```/g, "").trim()
    
    let suggestions

    let consinescore = req.score

    consinescore = consinescore.toFixed(2)
    
    try {
      suggestions = JSON.parse(raw)
    } catch (err) {
      console.error("Parse failed:", raw)
    
      return res.status(500).json({
        message: "Invalid AI output",
        raw
      })
    }
    
    return res.json({
      suggestions,
      score: consinescore
    })
    
  } catch (error) {
    console.error("Failed to get Ai Suggestion:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function handlen8ncall(req,res){

  const { keyword , location , experienceLevel , remote } = req.query;

  try {

    const response = await axios.get(process.env.N8N_URL,{
      params:{
        keyword,
        location,
        experienceLevel,
        remote
      }
    })

    return res.status(200).json({
      success: true,
      message: "Apply links:",
      data: response.data
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Please try again later"
    })
  }
}

async function handleGetUserInfo(req,res){

    const userID = req.user.userId

    try {

      const user = UserModel.findById(userID);

    if( !user ){
        return res.status(404).json({
          success: false,
          message: "User Not Found"
        })
    }

    return res.status(200).json({
      success: true,
      user
    })
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error"
      })
    }

}

export {handleChangePassword , handleGetAISuggestion , handlen8ncall , handleGetUserInfo};