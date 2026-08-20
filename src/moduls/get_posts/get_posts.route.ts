import { Router } from "express";
import { GetPostsController } from "./get_posts.controller";
import { GetPostsService } from "./get_posts.service";
import { AuthToken } from "../middlewares/authToken";

const service = new GetPostsService()
const controller = new GetPostsController(service)

const route = Router()

route.get("/get-posts", AuthToken, controller.getPost);

export default route