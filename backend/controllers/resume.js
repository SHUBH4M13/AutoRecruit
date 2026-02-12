import cloudinary from "../Config/Cloudinary.js";
import upload from "../middleware/Upload.js";
import UserModel from "../models/UserModel.js";

async function handleUploadResume(req,res){

    try {

        if(!req.file){
            return res.status(400).json({
                sucess: false,
                message: "Please Attach the file"
            })
        }

        const userID = req.user.userId

        
        
    } catch (error) {
        
    }

} 