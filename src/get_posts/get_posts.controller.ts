import { GetPostsService } from "./get_posts.service.ts";
import type { Response, Request } from "express";

export class GetPostsController{
    public service = new GetPostsService()
    getPost = async (req:Request,res:Response) => {
        try {
            const result = await this.service.getPost()
            return res.status(200).json({message:"se obtuvieron los posts", result})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"error del servidor"})
        }
    }
}