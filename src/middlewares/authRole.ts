import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken'

interface CustomJwtPayload extends JwtPayload{
    userId:string
    role:string
}

export const AuthRole = (...roles:string[]) => {
    return (req:Request, res:Response, next:NextFunction) => {
        try {
            const token = req.cookies.token

            const decoded = jwt.verify(token, "") as CustomJwtPayload

            const verifyRole = roles.includes(decoded.rol)

            if(!verifyRole){
                return res.status(403).json({message:"no tienes acceso"})
            }

            next()
        } catch (error) {
            return res.status(401).json({message:"token invalido"})
        }
    }
}