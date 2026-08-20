import { Router } from "express";
import { LikesController } from "./like.controller";
import { LikesService } from "./like.service";
import { AuthToken } from "../middlewares/authToken";

const service = new LikesService()
const controller = new LikesController(service)

const route = Router()

route.post("/like/:postId",AuthToken, controller.likes)

export default route