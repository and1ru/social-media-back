import type { NextFunction, Request, Response } from "express";
import type { PostsByUserService } from "./posts_by_user.service";

export class PostsByUserController {
    constructor (private service:PostsByUserService){}
    postByUser = async (req:Request, res:Response, next:NextFunction) => {
        const {userId} = req.params
        if(!userId || typeof userId !== "string"){
            // agregar un mensaje
            return 
        }

        try {
            const result = await this.service.postByUser(userId)
            return res.status(200).json({message:"se obtuvieron los post por el user id", result})
        } catch (error) {
            next(error)
        }
    }
}