import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

async function handleSignup(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isExist = await UserModel.findOne({ email: email });
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

async function handleLogin(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalEmail = email.toLowerCase();

    const isExist = await UserModel.findOne({ email: normalEmail });
    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, isExist.password);

    if (isPasswordValid) {
      const token = Jwt.sign(
        { email: isExist.email, userId: isExist._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      return res.status(200).json({
        success: true,
        message: "Logged IN",
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Wrong password",
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

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
  const { password , new_password } = req.body;

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

  await UserModel.findByIdAndUpdate(UserID , {
    password: new_password
  })

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

export { handleSignup, handleLogin , handleChangePassword };