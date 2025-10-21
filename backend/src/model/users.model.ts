import { Model, Schema } from "mongoose";
import mongoose from "mongoose";
import { Document } from "mongoose";
import bcrypt from 'bcrypt'
import jwt, { SignOptions } from 'jsonwebtoken'
import crypto from 'crypto'
import { UpdatePhoneMultiFactorInfoRequest } from "firebase-admin/auth";


export interface IUser extends Document {
    _id: mongoose.Types.ObjectId
    username: string,
    avatar: { url: string, localPath: string },
    email: string,
    fullname: string,
    password: string,
    isEmailVerified: boolean,
    refreshToken: string,
    emailVerificationToken: number | undefined,
    emailVerificationExpiry: Date | undefined,
    forgotPasswordToken: number | undefined,
    forgotPasswordExpiry: Date | undefined,
    isPasswordCorrect: Function,
    generateRefreshToken: Function,
    generateAccessToken: Function,
    generateTemporaryToken: Function
}


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: {
            url: String,
            localPath: String,
        },
        default: {
            url: "",
            localPath: ""
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    forgetPasswordToken: {
        type: String
    },
    emailVerificationToken: {
        type: Number
    },
    forgotPasswordExpiry: {
        type: Date
    },
    emailVerificationExpiry: {
        type: Date
    }
}, {
    timestamps: true,
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password) // plain_password and hashedPassword
}

userSchema.methods.generateRefreshToken = function (): string {
    return jwt.sign({
        id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        } as SignOptions
    )
}

userSchema.methods.generateAccessToken = function (): string {
    console.log("Access token expiry:", process.env.ACCESS_TOKEN_EXPIRY);

    return jwt.sign({
        id: this._id,
    },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        } as SignOptions
    )
}

userSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 300, partialFilterExpression: { isEmailVerified: false } }
);

userSchema.methods.generateTemporaryToken = function (): object {
    const unHashedToken: string = crypto.randomBytes(20).toString("hex")
    const hashedToken: string = crypto.createHash("sha256").update(unHashedToken).digest("hex")

    const tokenExpiry = Date.now() + (20 * 60 * 1000)
    return { unHashedToken, hashedToken, tokenExpiry }
}

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema)
export default User