import { Response, Request } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import User, { IUser } from "../model/users.model"
import ApiError from "../utils/apiError"
import ApiResponse from "../utils/apiResponse"
import sendEmail, {emailOtpVerificationMailGen} from "../utils/mail"
import jwt from "jsonwebtoken";


const generateAccessTokenAndRefreshToken = async (email: string): Promise<{ refreshToken: string, accessToken: string }> => {
    const user = await User.findOne({ email })

    const accessToken = user?.generateAccessToken()
    const refreshToken = user?.generateRefreshToken()

    return { accessToken, refreshToken }
}


const sendEmailForRegister = asyncHandler(async (req: Request, res: Response) => {
  const {email} = req.body
  let otp = Math.floor(Math.random() * 1000);
  
  const findUser = await User.findOne({email, isEmailVerified: true})
  if(findUser){
    return res.status(400)
    .json(new ApiResponse(400, "User already registered!"))
  }

  // if last time failed
  await User.findOneAndDelete({email})

  const user = await User.create({
    username: email.split('@')[0],
    email,
    password: "meow meow",
    emailVerificationToken: otp,
    emailVerificationExpiry: new Date(Date.now() + 5 * 60 * 1000)
  })  
  await user.save()
  
  try {
    await sendEmail({email, subject: "Verification email", mailgenContent: emailOtpVerificationMailGen(email.split('@')[0], otp)})
  } catch (error) {
    // console.log("error from SENDING THE EMAIL")
    throw new ApiError(400, "Email failed")
  }

  return res.status(200)
  .json(new ApiResponse(200, "" , "Otp sent successfully!"))
})

const otpCheckForRegister = asyncHandler(async(req: Request, res: Response) => {
  const {otp, email} = req.body
  // console.log({otp, email})
  const findUser = await User.findOne({email})
  if(!findUser){
    return res.status(400)
    .json(new ApiError(400, "User not found!"))
  }
  if(findUser?.emailVerificationToken != otp || Date.now() > findUser.emailVerificationExpiry!.getTime()){
    if(findUser?.emailVerificationToken !== otp) {
      // console.log("this is email token error !")
    }
    return res.status(400)
    .json(new ApiError(400, "Email verification Failed"))
  }
 

  findUser.emailVerificationExpiry = undefined
  findUser.emailVerificationToken = undefined

  findUser.isEmailVerified = true

  await findUser.save()

  return res.status(200)
  .json(new ApiResponse(200, "", "Email verified successfully!"))
})

const registerUser = asyncHandler(async (req: Request, res: Response) => {

    // console.log("this is from register user!")
    const { email, password, fullname } = req.body
    // console.log("request reached here !")

    // check if user already exists or not
    const user: IUser | null = await User.findOne({ email })

    if(!user){
      return new ApiError(400, "User not found while registering")
    }

    user.password = password
    user.fullname = fullname

    await user.save()

    // if (createdUser) {
    //     return res
    //         .status(400)
    //         .json(new ApiError(400, "User already exists!"))
    // }

    if(!user){
      return res.status(400)
      .json(new ApiError(400, "User not found!"))
    }

    const newUser: IUser = await User.findOne({ email }).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )

    return res.status(200)
        .json(new ApiResponse(200, newUser, "User created succesfully!"))
})

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    console.log("this is the email in controller ", email)
    console.log("this is password", password)

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400)
        .json(new ApiError(400, "email not found!"))
    }

    // compare password
    const pass = await user.isPasswordCorrect(password)
    // console.log(pass)
    if (!pass) {
        return res.status(400)
        .json(new ApiError(400, "password is incorrect!"))
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(email)

    const selectedUser = await User.findOne({ email }).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    )

    user.refreshToken = refreshToken
    user.save({validateBeforeSave: true})

    if(!selectedUser) return;


    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, selectedUser, "Logged in Successfully!"
    ))

})

const logoutUser = asyncHandler(async(req: Request, res: Response) => {
    // verify the jwt through jwt middleware
    // clear the refresh token from the database

    const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            "refreshToken": ""
        }
    })

    user?.save()

    const options = {
        httpOnly: true, 
        secure: true
    }

    res.status(200)
    .clearCookie('accessToken',options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {user}, "logged out successfully!"))

})

const getUserProfile = asyncHandler(async(req: Request, res: Response) => {
    // console.log("this reached in the controller")
    const user = await User.findById(req.user).select(
      "username email"
    )
    return res.status(200)
    .json(new ApiResponse(200, {user}, "user data fetched succesfullly!"))
})


// ---

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  // console.log("this is for testing refreshaccesstoken")
  const incomingRefreshToken = req.cookies.refreshToken;
  // console.log("request reached to the refreshAccesstoken ", incomingRefreshToken)

  if (!incomingRefreshToken) {
    throw new ApiError(402, "Invalid refresh token!")
  }


  try {
    // verify refresh token
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    // find user in DB
    const user = await User.findById(decoded?.id);
    // console.log(user)

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // optional: check if refresh token matches the one stored in DB
    if (user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // generate new access + refresh token pair
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user.email);


    // console.log("these are the two tokens", accessToken, refreshToken)
    // save the new refresh token (optional security step)
    // user.refreshToken = refreshToken;
    // await user.save({ validateBeforeSave: false });

    // console.log('this is the new token',user.refreshToken)

    // set cookies again
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      // .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed successfully!"
        )
      );
  } catch (error) {
    throw new ApiError(400, "Invalid or expired refresh token");
  }
});


export { registerUser, loginUser, generateAccessTokenAndRefreshToken, logoutUser, getUserProfile, refreshAccessToken, sendEmailForRegister, otpCheckForRegister}