import ApiError from "../utils/apiError.ts";
// import { asyncHandler } from "../utils/asyncHandler.ts";
import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import User, { IUser } from "../model/users.model.ts";

declare global {
  namespace Express {
    export interface Request {
      user?: IUser; // 👈 add your custom property
    }
  }
}

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken;
    // console.log("hello world!");
    // console.log(token);
    // console.log("meow meow");

    if (!token) {
      return res.status(401).json(new ApiError(401, "Access token not found!"));
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload;

    // Find user
    if (typeof decodedToken === "object" && "id" in decodedToken) {
      const user = await User.findById(decodedToken.id);

      if (!user) {
        return res.status(404).json(new ApiError(404, "User not found!"));
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json(new ApiError(401, "Invalid token payload!"));
    }
  } catch (error: any) {
    // console.error("JWT verification error:", error.message);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json(new ApiError(401, "Access token expired!"));
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json(new ApiError(401, "Invalid access token!"));
    }

    // Default case
    return res.status(500).json(new ApiError(500, "Internal server error during token verification"));
  }
};

export default verifyJWT