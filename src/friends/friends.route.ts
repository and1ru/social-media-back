import { FriendsService } from "./friends.service";
import { FriendsController } from "./friends.controller";
import { Router } from "express";
import { AuthToken } from "../middlewares/authToken";

const service = new FriendsService()
const controller = new FriendsController(service)

const route = Router()

route.get("/friends", AuthToken, controller.friends);

export default route