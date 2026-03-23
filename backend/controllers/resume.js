import cloudinary from "../Config/Cloudinary.js";
import UserModel from "../models/UserModel.js";
import { PDFParse } from "pdf-parse";

async function handleUploadResume(req,res){

    try {

        if(!req.file){
            return res.status(400).json({
                sucess: false,
                message: "Please Attach the file"
            })
        }

        const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const userID = req.user.userId

        const result = await cloudinary.uploader.upload( base64File ,{
            folder: "resume",
            resource_type: "raw"
        })

        await UserModel.findByIdAndUpdate(userID , {
            ResumeLink: result.secure_url
        })

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Resume uploaded failed"
        })
    }
} 

//middleware
async function handleParseResume(req, res , next) {
  try {

    if (!req.file) {
          return res.status(400).json({
              message: "File not found"
          })
      }

      const uint8Array = new Uint8Array(req.file.buffer)
      const parser = new PDFParse(uint8Array)
      const data = await parser.getText(parser)
      const text = data.text

      req.resumetext = text;

      next();

  } catch (error) {
      console.error(error)

      return res.status(500).json({
          message: error.message || "Something went wrong"
      })
  }
}

async function handleResumeByLink(req, res) {
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

export { handleUploadResume , handleParseResume , handleResumeByLink }