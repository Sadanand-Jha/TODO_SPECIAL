import mongoose, { Document, Schema } from "mongoose";
import { Model } from "mongoose";

export interface ITodo extends Document {
  status: boolean;    
  owner: string;     
  deadline: Date;
  todo: string;
}

const todoSchema = new Schema<ITodo>(
  {
    status: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    todo: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Give TypeScript the type argument
const Todo: Model<ITodo> = mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
