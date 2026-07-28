import { Router } from "express";
import { LikesController } from "./like.controller";
import { LikesService } from "./like.service";

const service = new LikesService()
const controller = new LikesController(service)

const route = Router()

route.post("like", controller.likes)

export default route