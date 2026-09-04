import { Router } from "express";
import { FindUsersController } from "./find_users.controller";
import { FindUsersService } from "./find_users.service";
import { AuthToken } from "../../middlewares/authToken";

const service = new FindUsersService()
const controller = new FindUsersController(service)

const route = Router()

route.get("/find-users/:name", AuthToken, controller.findUsers);

export default route