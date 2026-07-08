import type { NextFunction, Request, Response } from "express";
import { postSchema } from "./create_post.schema.ts";
import { CreatePostService } from "./create_post.service.ts";

export class CreatePostController {
  constructor(private service:CreatePostService){}
  
  post = async (req: Request, res: Response, next: NextFunction) => {
    const data = postSchema.safeParse(req.body);
    const userId = req.user.id;
    if (!data.success) {
      return next(data.error);
    }
    try {
      await this.service.post(data.data.content, userId);
      return res.status(201).json({ message: "post creado" });
    } catch (error) {
      next(error);
    }
  };
}
