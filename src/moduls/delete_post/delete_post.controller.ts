import type { NextFunction, Request, Response } from "express";
import type { DeletePostService } from "./delete_post.service";
import { ObjectId } from "mongodb";

export class DeletePostController {
    constructor(private service: DeletePostService) { }
    deletePost = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user.id
        const { postId } = req.params

        if (!postId || typeof postId !== "string" || !ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "error with postId", success: false })
        }

        try {
            await this.service.deletePost(postId, userId)
            return res.status(200).json({ message: "post deleted", success:true })
        } catch (error) {
            return next(error)
        }
    }
}