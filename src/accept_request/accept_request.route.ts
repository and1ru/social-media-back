import { Router } from "express";
import { AcceptRequestController } from "./accept_request.controller";
import { AcceptRequestService } from "./accept_request.service";
import { AuthToken } from "../middlewares/authToken";

const service = new AcceptRequestService()
const controller = new AcceptRequestController(service)

const route = Router()

route.put("/accept-request", AuthToken, controller.acceptRequest)

export default route