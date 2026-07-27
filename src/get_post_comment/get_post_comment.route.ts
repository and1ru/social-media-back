import { Router } from "express";
import { GetPostCommentsController } from "./get_post_comment.controller.ts";
import { GetPostCommentsService } from "./get_post_comment.service.ts";

const service = new GetPostCommentsService()
const controller = new GetPostCommentsController(service)

const route = Router()

route.get("/comments/:postId", controller.getPostComments)

export default route