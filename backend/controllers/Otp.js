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

    await OtpModel.deleteMany({UserID:userId})

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

export {handleSendOTP , handleVerifyOTP}