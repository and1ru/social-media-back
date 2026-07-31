import { Router } from "express";
import { UsersConnectedController } from "./user_connected.controller";
import { UsersConnectedService } from "./user_connected.service";
import { AuthToken } from "../middlewares/authToken";

const service = new UsersConnectedService()
const controller = new UsersConnectedController(service)

const route = Router()

route.get("/status/:userId", AuthToken, controller.usersConnected)

export default route