import type { NextFunction, Request, Response } from "express"
import { postSchema } from "./post.schema.ts"
import { PostService } from "./post.service.ts"

export class CreatePostController {
    private service = new PostService()
    post = async (req:Request, res:Response, next:NextFunction) => {
        const data = postSchema.safeParse(req.body)
        const userId = req.user.id
        if(!data.success){
            return next(data.error)
        }
        try {
            await this.service.post(data.data.content, userId)
            return res.status(201).json({message:"post creado"})
        } catch (error) {
            next(error)
        }
    }
}