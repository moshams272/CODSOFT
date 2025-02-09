import jwt from "jsonwebtoken"
export const generateJWT= async(payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"30d"});
}