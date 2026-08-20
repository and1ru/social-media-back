import { Router } from "express";
import { GetRequestsController } from "./get_requests.controller";
import { GetRequestsService } from "./get_requests.service";
import { AuthToken } from "../../middlewares/authToken";

const service = new GetRequestsService()
const controller = new GetRequestsController(service)

const route = Router()

route.get("/get-requests", AuthToken, controller.getRequest);

export default route