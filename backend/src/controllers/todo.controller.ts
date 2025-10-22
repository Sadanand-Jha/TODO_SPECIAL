import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import Todo from "../model/todo.model";
import { ITodo } from "../model/todo.model";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/apiError";

const addTodo = asyncHandler(async(req: Request, res: Response) => {
    const {content, deadline} = req.body
    // console.log("this is from controller helloworld ~!")

    // console.log("this is in controller for testing ", content, deadline)
    const todo: ITodo = await Todo.create({
        todo: content,
        deadline,
        owner: req.user?.fullname
    })

    await todo.save()

    return res.status(200)
    .json(new ApiResponse(200, {todo}, "todo added successfully!"))
})

const getAllTodo = asyncHandler(async (req: Request ,res: Response) => {
    const todos = await Todo.find({owner: req.user?.fullname})
    // console.log(todos)
    // console.log("helloworld! this is from getalltodo")
    return res.status(200)
    .json(new ApiResponse(200, todos, "Successfully fetched all data!"))
})

const deleteTodo = asyncHandler(async(req: Request, res: Response) => {
    // console.log("this is from todo controller ", req.body)
    const {deadline, todo} = req.body
    
    const delete_todo = await Todo.findOneAndDelete({deadline, todo})
    if(!delete_todo){
        return res.status(400)
        .json(new ApiError(400, "todo not found!"))
    }
    return res.status(200)
    .json(new ApiResponse(200,"", "Todo deleted"))
})

export {addTodo, getAllTodo, deleteTodo}