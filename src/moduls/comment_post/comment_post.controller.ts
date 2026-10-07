import type { NextFunction, Request, Response } from "express";
import { commentPostSchema } from "./comment_post.schema";
import type { CommentPostService } from "./comment_post.service";

export class CommentPostController {
    constructor(private service:CommentPostService){}
    
    commetPost = async (req:Request, res:Response, next:NextFunction) => {
        const data = commentPostSchema.safeParse(req.body)
        const userId = req.user.id
        const userName = req.user.name

        if(!data.success){
            return next(data.error)
        }
        
        try {
            const { comment, postId } = data.data
            await this.service.commetPost(userId, comment, postId, userName)

            return res.status(201).json({message:"post commented"})
        } catch (error) {
            return next(error)
        }
    }
}