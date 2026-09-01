import type { NextFunction, Request, Response } from "express";
import type { DeletePostService } from "./delete_post.service";

export class DeletePostController {
    constructor(private service:DeletePostService){}
    deletePost = async (req:Request, res:Response, next:NextFunction) => {
        const { id } = req.user
        const { postId } = req.params
        if(!postId || typeof postId !== "string"){
            // agregar un mensaje 
            return res.status(400).json({message:"", success:false})
        }
        try {
            await this.service.deletePost(postId, id)
            return res.status(200).json({message:"post deleted"})
        } catch (error) {
            next(error)
        }
    }
}