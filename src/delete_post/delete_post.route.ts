import { DeletePostService } from "./delete_post.service";
import { DeletePostController } from "./delete_post.controller";
import { Router } from "express";
import { AuthToken } from "../middlewares/authToken";

const service = new DeletePostService()
const controller = new DeletePostController(service)

const route = Router()

route.delete("", AuthToken, controller.deletePost)

export default route