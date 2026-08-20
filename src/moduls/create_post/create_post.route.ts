import { Router } from "express";
import { CreatePostController } from "./create_post.controller.ts";
import { CreatePostService } from "./create_post.service.ts";
import { AuthToken } from "../../middlewares/authToken.ts";

const service = new CreatePostService()
const controller = new CreatePostController(service)

const route = Router()

route.post("/create-post", AuthToken, controller.post);

export default route