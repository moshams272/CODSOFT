import { appError } from "../utils/AppError.js";
import { httpStatusText } from "../utils/httpStatusText.js";
import jwt from "jsonwebtoken"
import "dotenv/config";
export const verifyToken=(req,res,next)=>{
    const authHeader = req.headers['Authorization']||req.headers['authorization'];
    if(!authHeader){
        return next(appError.create("token is required",401,httpStatusText.FAIL));
    }
    const token=authHeader.split(' ')[1];
    try{
        const currentUser=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.currentUser=currentUser;
        next();
    }catch(err){
        return next(appError.create("invalid token",401,httpStatusText.ERROR));
    }
}