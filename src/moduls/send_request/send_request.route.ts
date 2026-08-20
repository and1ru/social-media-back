import { Router } from "express";
import { SendRequestController } from "./send_request.controller";
import { SendRequestService } from "./send_request.service";
import { AuthToken } from "../../middlewares/authToken";

const service = new SendRequestService()
const controller = new SendRequestController(service)

const route = Router()

route.post("/send-request", AuthToken, controller.sendRequest);

export default route