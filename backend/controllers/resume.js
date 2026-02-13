import cloudinary from "../Config/Cloudinary.js";
import UserModel from "../models/UserModel.js";

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

export { handleUploadResume }