import type { NextFunction, Response, Request } from "express";
import type { PostByIdService } from "./get_post_by_id.service";

export class PostByIdController {
    constructor(private service:PostByIdService){}

    postById = async (req:Request, res:Response, next:NextFunction) => {
        const { postId } = req.params
        if(!postId || typeof postId !== "string"){
            return res.status(400).json({message:"error with postId", success:false})
        }
        try {
            const result = await this.service.postById(postId)
            return res.status(200).json({message:"se obtuvo un post", result})
        } catch (error) {
            next(error)
        }
    }
}