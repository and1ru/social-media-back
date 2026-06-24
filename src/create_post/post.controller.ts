import type { NextFunction, Request, Response } from "express"
import { postSchema } from "./post.schema.ts"
import { PostService } from "./post.service.ts"

export class CreatePostController {
    private service = new PostService()
    post = async (req:Request, res:Response, next:NextFunction) => {
        const data = postSchema.safeParse(req.body)
        if(!data.success){
            return next(data.error)
        }
        try {
            const fecha = new Date()
            const user_id = "hola hola hola"
            const post = {
                ...data.data,
                fecha,
                user_id
            }
            await this.service.post(post)
            return res.status(201).json({message:"post creado"})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}