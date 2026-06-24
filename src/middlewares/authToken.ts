import jwt from 'jsonwebtoken'
import type { NextFunction, Request, Response} from 'express'
import { envs } from '../helpers/envs.ts'

interface payload {
    id:string, 
    name:string
}

export const AuthToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.token
    if(!token){
        return res.status(403).json({message:'jajajaja no teken'})
    }
    const verify = jwt.verify(token,envs.jwt_secret) as payload

    if(!verify){
        return res.status(403).json({message:"token no valido"}) 
    }

    req.user = verify

    next()
}