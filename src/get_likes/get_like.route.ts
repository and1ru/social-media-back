import { Router } from "express";
import { GetLikesController } from "./get_like.controller";
import { GetLikesService } from "./get_like.service";
import { AuthToken } from "../middlewares/authToken";

const service = new GetLikesService();
const controller = new GetLikesController(service);

const route = Router();

route.get("/like/:postId", AuthToken, controller.likes);

export default route;