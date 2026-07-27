import { Router } from "express";
import { PostsByUserController } from "./posts_by_user.controller";
import { PostsByUserService } from "./posts_by_user.service";

const service = new PostsByUserService()
const controller = new PostsByUserController(service)

const route = Router()

route.get("/post/:userId", controller.postByUser)

export default route