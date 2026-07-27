import type { NextFunction, Request, Response } from "express";
import type { DeletePostService } from "./delete_post.service";

export class DeletePostController {
    constructor(private service:DeletePostService){}
    deletePost = async (req:Request, res:Response, next:NextFunction) => {
        const { id } = req.user
        const { postId } = req.params
        if(!postId || typeof postId !== "string"){
            return
        }
        try {
            
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}