import { Router } from "express";
import { RejectRequestController } from "./reject_request.controller";
import { RejectRequestService } from "./reject_request.service";

const service = new RejectRequestService()
const controller = new RejectRequestController(service)

const route = Router()

route.put("/reject-request", controller.rejectRequest);

export default route