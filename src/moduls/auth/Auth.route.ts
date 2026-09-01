import { Router } from "express";
import { AuthController } from "./Auth.controller";
import { AuthToken } from "../../middlewares/authToken";

const controller = new AuthController()

const route = Router()

route.get("/auth/me", AuthToken, controller.auth);

export default route