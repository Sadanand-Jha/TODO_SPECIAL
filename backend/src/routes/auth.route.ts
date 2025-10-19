import { Router } from "express";
import { getUserProfile, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/auth.controller.ts";
import verifyJWT from "../middlewares/auth.middleware.ts";

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(verifyJWT, logoutUser)
router.route('/profile').get(verifyJWT, getUserProfile)
router.route('/refresh').get(refreshAccessToken)

export default router