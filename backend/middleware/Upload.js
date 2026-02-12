import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Config/Cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resumes",
    resource_type: "raw", 
    allowed_formats: ["pdf", "doc", "docx"],
  },
});

const upload = multer({ storage });

export default upload;
