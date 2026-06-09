import type { Request, Response } from "express";
import { registerSchema } from "./register.schema.ts";
import { RegisterService } from "./register.service.ts";

export class RegisterController {
    private service = new RegisterService()

    register = async (req:Request, res:Response) => {
        const data = registerSchema.safeParse(req.body)
        if(!data.success){
            return res.status(401).json({message:"datos no validos"})
        }
        try {
            const user = data.data
            await this.service.register(user)
            return res.status(201).json({message:'usuario fue creado'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"error interno del servidor"})
        }
    }
}