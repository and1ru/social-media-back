import { Router } from "express";
import { RejectRequestController } from "./reject_request.controller";
import { RejectRequestService } from "./reject_request.service";
import { AuthToken } from "../middlewares/authToken";

const service = new RejectRequestService()
const controller = new RejectRequestController(service)

const route = Router()

route.put("/reject-request", AuthToken, controller.rejectRequest);

export default route