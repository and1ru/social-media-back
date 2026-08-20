import { Router } from "express";
import { GetMessagesController } from "./get_message.controller.ts";
import { GetMessagesService } from "./get_message.service.ts";
import { AuthToken } from "../middlewares/authToken.ts";

const routes = Router()

const service = new GetMessagesService()
const controller = new GetMessagesController(service)

routes.get("/get-messages/:friendId", AuthToken, controller.getMessage)

export default routes