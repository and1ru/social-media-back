import { Router } from "express";
import { FindUsersController } from "./find_users.controller";
import { FindUsersService } from "./find_users.service";

const service = new FindUsersService()
const controller = new FindUsersController(service)

const route = Router()

route.get("/find-users/:name", controller.findUsers);

export default route