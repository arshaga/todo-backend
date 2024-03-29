import loginModel from "../models/loginM.js";
import userModel from "../models/userM.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import { fileUpload, randomKey, fileDelete } from "../utils/fileUploader.js";
import { checkUser } from "../utils/checkAuth.js";
import { generatePass, sendMail } from "../utils/mail.js";

export const addUser = async (req, res, next) => {
  try {
    const newUser = userModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    await newUser.save();
    res.status(200).json("User add successfully");
  } catch (err) {
    next(createError(400, err.message));
  }
};

export const updatetUser = async (req, res, next) => {
  let imgName, userUpdated;
  try {
    let profileSave, pass;
    if (req?.files?.image) {
      imgName = randomKey() + req?.files?.image?.name;
      profileSave = await fileUpload(imgName, req.files.image);
      req.body.image=imgName
      if (!profileSave)
        return next(
          createError(400, "failed to upload profile please try again")
        );
    }
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      pass = bcrypt.hashSync(req.body.password, salt);
      req.body.password=pass
    }
    userUpdated = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        $set: { ...req.body},
      },
      { new: false }
    );
    if(profileSave)
        await fileDelete(userUpdated?.image);
    res
      .status(200)
      .json({ success: true, message: "user updated successfully" });
  } catch (err) {
    next(createError(400, err.messgae));
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userDelete = await userModel.findByIdAndDelete(req.params.id);
    await loginModel.findByIdAndDelete(req.params.id);
    res.status(200).json("user delete successfully");
  } catch (err) {
    console.log(err);
    res.status(400).json("failed to delete");
  }
};

export const postUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const pass = bcrypt.hashSync(req.body.password, salt);
    const user = userModel({
      ...req.body,
      password: pass,
    });
    const login = loginModel({ ...req.body });
    await login.save();
    await user.save();
    res.status(200).json({ message: "user add successfully", success: true });
  } catch (err) {
    next(createError(400, err.message));
  }
};

export const getUser = async (req, res, next) => {
  try {
    // console.log(req.user.id)
    const getUsers = await userModel.findById(req.user.id);
    const { password, ...others } = getUsers?._doc;
    res
      .status(200)
      .json({ success: true, data: others, message: "user list found" });
    // console.log(userGet)//
  } catch (err) {
    console.log(err);
    next(createError(500, err.message));
  }
};

export const forgotPass =async(req,res,next)=>{
  try{
    const checkUser = await userModel.find({email:req.body.email})
    if(!checkUser)
    return next(createError(500,"user not found"));
  const pass = generatePass(6)
  const subject ="Forgot password"
  const text ="Your password has been successfully changed to" +pass


  const salt = bcrypt.genSaltSync(10);
  let pass2 = bcrypt.hashSync(pass, salt);

  const mailCheck = await sendMail(req.body.mail,subject,text)
  if(!mailCheck)
   return next(createError(400,
   "Failed to send email,Please try again"))
 await  userModel.findByIdAndUpdate(checkUser._id,{
  $set:{password:pass2}
})
 res.status(200).json({success:true,
  message:"Email send successfully"})
  }
  
  catch(err)
  {
    console.log(err)
    next(createError(400,err.message||
      "Failed to update password,Please try again"))
  }
}