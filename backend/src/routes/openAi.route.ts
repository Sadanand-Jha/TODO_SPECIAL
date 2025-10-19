import express from "express";
import meow from "../controllers/openAi.controller.ts";


const router = express.Router();

router.route('/suggest').post(meow)



export default router;
