import type { NextFunction, Request, Response } from "express";
import type { GetMessagesService } from "./get_message.service.ts";
import { CustomError } from "../../helpers/custom-error.ts";

export class GetMessagesController {
    constructor(private service:GetMessagesService){}

    getMessage = async (req:Request, res:Response, next:NextFunction) => {
        const userId = req.user.id
        const { friendId } = req.params
        if(!friendId || typeof friendId !== "string"){
            return next(new CustomError("las credenciales son obligatorias", 400))
        }

        try {
            const result = await this.service.getMessage(userId, friendId)
            res.status(200).json({message:"se obtubieron todos los mensajes con tu amigo", result})
        } catch (error) {
            next(error)
        }
    }
}