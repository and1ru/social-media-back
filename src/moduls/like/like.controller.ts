import type { NextFunction, Response, Request } from "express";
import type { LikesService } from "./like.service";

export class LikesController {
    constructor(private service:LikesService){}
    likes = async (req:Request, res:Response, next:NextFunction) => {
        const { id } = req.user
        const { postId } = req.params
        if(!postId || typeof postId !== "string"){
            // agregar un mensaje
            return
        }
        try {
            const result = await this.service.likes(postId, id)
            const { liked, likes} = result
            return res.status(200).json({message:"se dio o se quito el like", liked, likes})
        } catch (error) {
            next(error)
        }
    }
}