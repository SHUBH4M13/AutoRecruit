import transport from "../Config/NodeMailer.js";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import OtpModel from "../models/OtpModel.js";

function GenerateCode() {
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  return otp;
}

async function handleSendOTP(req, res) {
  const userID = req.user.userId;

  try {
    const user = await UserModel.findById(userID);
    const GenerateOTP = GenerateCode().toString();

    const hashOTP = bcrypt.hash(GenerateOTP, 10);

    await OtpModel.deleteMany({ UserID: userID });

    await OtpModel.create({
      UserID: userID,
      otp: hashOTP,
      expireAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    await transport.sendMail({
      to: user.email,
      subject: "OTP",
      text: `${GenerateOTP} , Only valid for one hour`,
    });

    return res.status(200).json({
      success: true,
      message: "email sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "email not sent ERROR",
    });
  }
}

async function handleVerifyOTP(req, res) {
  const userId = req.user.userId; 
  const new_password = req.body

  try {
    const user_otp = req.body;

    const Hashedotp = await OtpModel.findOne({ UserID: userId });

    if (Hashedotp.expireAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const isCompare = bcrypt.compare(user_otp, Hashedotp.otp);

    if (!isCompare) {
      return res.status(401).json({
        success: false,
        message: "OTP invalid",
      });
    }

    await UserModel.findByIdAndUpdate( isExist._id , {
      password: new_password
    })

    await OtpModel.deleteMany({ UserID: userId });

    return res.status(200).json({
      success: true,
      message: "OTP Validated Successfully & password changed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function sendPasswordResetOTP(req, res) {
  const user_email = req.body;

  try {
    const isExist = await UserModel.findOne({ email: user_email });

    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "User not exist , create an account",
      });
    }

    const otp = GenerateCode().toString();
    const hashedOtp = bcrypt.hash(otp, 10);

    await OtpModel.create({
      UserID: isExist._id,
      otp: hashedOtp,
      expireAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    await transport.sendMail({
      to: user.email,
      subject: "OTP",
      text: `${otp} , Only valid for one hour`,
    });

    return res.status(200).json({
      success: true,
      message: "email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function verifyPasswordResetOTP(req, res) {
  const { email, otp, new_password } = req.body;

  try {
    const isExist = await UserModel.find({ email: email });

    const hashedOtp = await UserModel.find({ _id: isExist._id });

    const compare = bcrypt.compare(otp, hashedOtp);

    if (!compare) {
      return res.status(401).json({
        success: false,
        message: "OTP invalid",
      });
    }

    await UserModel.findByIdAndUpdate( isExist._id , {
      password: new_password
    })

    return res.status(200).json({
      success: true,
      message: "OTP Validated Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export { handleSendOTP, handleVerifyOTP, sendPasswordResetOTP , verifyPasswordResetOTP};
