import { Router } from "express";
import { getUserProfile, loginUser, logoutUser, otpCheckForRegister, refreshAccessToken, registerUser, sendEmailForRegister } from "../controllers/auth.controller.ts";
import verifyJWT from "../middlewares/auth.middleware.ts";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(verifyJWT, logoutUser)
router.route('/profile').get(verifyJWT, getUserProfile)
router.route('/refresh').get(refreshAccessToken)
router.route('/getotp').post(sendEmailForRegister)
router.route('/verifyotp').post(otpCheckForRegister)

export default router