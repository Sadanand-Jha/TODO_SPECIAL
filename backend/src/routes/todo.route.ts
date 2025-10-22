import { Router } from "express";
import { addTodo, deleteTodo, getAllTodo } from "../controllers/todo.controller";
import verifyJWT from "../middlewares/auth.middleware";

const router = Router()
router.route('/addtodo').post(verifyJWT,addTodo)
router.route('/gettodo').get(verifyJWT,getAllTodo)
router.route('/deletetodo').delete(deleteTodo)
export default router