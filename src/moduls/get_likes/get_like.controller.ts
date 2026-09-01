import type { NextFunction, Response, Request } from "express";
import type { GetLikesService } from "./get_like.service";

export class GetLikesController {
  constructor(private service: GetLikesService) {}
  likes = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const { postId } = req.params;
    if (!postId || typeof postId !== "string") {
      return;
    }

    try {
      const result = await this.service.likes(postId, id);
      const { liked, likes } = result;

      return res.status(200).json({ message: "se obtuvieron los likes", liked, likes });
    } catch (error) {
      next(error);
    }
  };
}
