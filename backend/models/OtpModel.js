import mongoose from "mongoose";

const OTPScehma = new mongoose.Schema({
    UserID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    }, 
    otp:{
        type: String,
        required: true,
    }, 
    expireAt: {
        type: Date,
    }
} , {timestamps: true})

const OtpModel = mongoose.model("OtpModel" , OTPScehma)

export default OtpModel