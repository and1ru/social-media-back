import { Router } from "express";
import { PostByIdController } from "./get_post_by_id.controller";
import { PostByIdService } from "./get_post_by_id.service";

const service = new PostByIdService()
const controller = new PostByIdController(service)

const route = Router()

route.get("/post/:postId", controller.postById)

export default route