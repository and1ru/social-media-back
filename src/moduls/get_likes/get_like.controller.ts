import type { NextFunction, Response, Request } from "express";
import type { GetLikesService } from "./get_like.service";

export class GetLikesController {
  constructor(private service: GetLikesService) {}
  likes = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const { postId } = req.params;

    if (!postId || typeof postId !== "string") {
      return res.status(400).json({message:"error with postId", success:false})
    }

    try {
      const { liked, likes } = await this.service.likes(postId, userId);
      return res.status(200).json({ message: "got likes", liked, likes });
    } catch (error) {
      return next(error);
    }
  };
}
