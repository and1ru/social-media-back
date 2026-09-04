import type { NextFunction, Request, Response } from "express";
import type { GetMessagesService } from "./get_message.service.ts";

export class GetMessagesController {
    constructor(private service:GetMessagesService){}

    getMessage = async (req:Request, res:Response, next:NextFunction) => {
        const userId = req.user.id
        const { friendId } = req.params
        if(!friendId || typeof friendId !== "string"){
            return res.status(400).json({message:"error with friendId", success:false})
        }

        try {
            const result = await this.service.getMessage(userId, friendId)
            return res.status(200).json({message:"se obtubieron todos los mensajes con tu amigo", result})
        } catch (error) {
            next(error)
        }
    }
}