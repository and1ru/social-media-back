import type { NextFunction, Request, Response } from "express";
import { registerSchema } from "./register.schema.ts";
import { RegisterService } from "./register.service.ts";

export class RegisterController {
    private service = new RegisterService()

    register = async (req:Request, res:Response, next:NextFunction) => {
        const data = registerSchema.safeParse(req.body)
        if(!data.success){
            return next(data.error)
        }
        try {
            const user = data.data
            await this.service.register(user)
            return res.status(201).json({success:true, message:'usuario fue creado'})
        } catch (error) {
            next(error)
        }
    }
}