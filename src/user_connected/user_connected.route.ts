import { Router } from "express";
import { UsersConnectedController } from "./user_connected.controller";
import { UsersConnectedService } from "./user_connected.service";

const service = new UsersConnectedService()
const controller = new UsersConnectedController(service)

const route = Router()

route.get("/status/:userId", controller.usersConnected)

export default route