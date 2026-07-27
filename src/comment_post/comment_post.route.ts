import { Router } from "express";
import { CommentPostController } from "./comment_post.controller";
import { CommentPostService } from "./comment_post.service";

const service = new CommentPostService()
const controller = new CommentPostController(service)

const route = Router()

route.post("/comment", controller.commetPost)

export default route