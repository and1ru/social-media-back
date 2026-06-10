import type { Request, Response } from "express"
import { postSchema } from "./post.schema.ts"
import { PostService } from "./post.service.ts"

export class CreatePostController {
    private service = new PostService()
    post = async (req:Request, res:Response) => {
        const data = postSchema.safeParse(req.body)
        if(!data.success){
            return res.status(401).json({message:"datos no validos"})
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
            return res.status(500).json({message:'error del servidor'})
        }
    }
}