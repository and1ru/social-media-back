import { GetPostsService } from "./get_posts.service.ts";
import type { Response, Request, NextFunction } from "express";

export class GetPostsController{
    public service = new GetPostsService()
    getPost = async (_req:Request,res:Response, next:NextFunction) => {
        try {
            const result = await this.service.getPost()
            return res.status(200).json({message:"se obtuvieron los posts", result})
        } catch (error) {
            next(error)
        }
    }
}