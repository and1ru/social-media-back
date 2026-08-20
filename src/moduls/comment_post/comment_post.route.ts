import { Router } from "express";
import { CommentPostController } from "./comment_post.controller";
import { CommentPostService } from "./comment_post.service";
import { AuthToken } from "../middlewares/authToken";

const service = new CommentPostService()
const controller = new CommentPostController(service)

const route = Router()

route.post("/comment", AuthToken, controller.commetPost)

export default route