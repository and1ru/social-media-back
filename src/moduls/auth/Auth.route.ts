import { Router } from "express";
import { AuthController } from "./Auth.controller";
import { AuthToken } from "../../middlewares/authToken/authToken";

const controller = new AuthController()

const route = Router()

route.get("/me", AuthToken, controller.auth);

export default route