import type { NextFunction, Request, Response } from "express";
import { registerSchema } from "./register.schema.ts";
import { RegisterService } from "./register.service.ts";

export class RegisterController {
    constructor(private service:RegisterService){}
    
    register = async (req:Request, res:Response, next:NextFunction) => {
        const data = registerSchema.safeParse(req.body)
        if(!data.success){
            return next(data.error)
        }

        try {
            await this.service.register(data.data)
            return res.status(201).json({success:true, message:'usuario created'})
        } catch (error) {
            return next(error)
        }
    }
}