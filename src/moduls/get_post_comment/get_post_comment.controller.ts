import type { NextFunction, Response, Request } from "express";
import { getPostCommentsSchema } from "./get_post_comment.schema";
import type { GetPostCommentsService } from "./get_post_comment.service";

export class GetPostCommentsController {
    constructor(private service:GetPostCommentsService){}

    getPostComments = async (req:Request, res:Response, next:NextFunction) => {
        const data = getPostCommentsSchema.safeParse(req.params)
        if(!data.success){
            return next(data.error)
        }
        try {
            const result = await this.service.getPostComments(data.data.postId)

            const { commentCount, comments} = result

            return res.status(200).json({message:"se obtubieron los comentarios", commentCount, comments })
        } catch (error) {
            next(error)
        }
    }
}