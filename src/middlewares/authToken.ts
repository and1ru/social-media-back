import jwt from 'jsonwebtoken'
import type { NextFunction, Request, Response} from 'express'

export const AuthToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.token
    if(!token){
        return res.status(403).json({message:'no token'})
    }
    const verify = jwt.verify(token,"")

    if(!verify){
        return res.status(403).json({message:"token no valido"})
    }

    next()
}