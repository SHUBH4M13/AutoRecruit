import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

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


export {handleChangePassword};