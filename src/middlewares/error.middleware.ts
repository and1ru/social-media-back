export class CustomError extends Error {
    public status:number

    constructor(message:string, status:number){
        super(message)
        this.status = status
    }
}

import type { Request, Response, NextFunction } from "express"

export const errorMiddleware = (err:Error | CustomError, req:Request, res:Response, next:NextFunction) => {

    // ver si es un error de jsonwebtoken
    // si es un error de tipado de zod
    // otros errores
    // error de servidor

    return res.status(500).json({message:"error del servidor"})
}