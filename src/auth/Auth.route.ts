import { Router } from "express";
import { AuthController } from "./Auth.controller";

const controller = new AuthController()

const route = Router()

route.get("/auth/me", controller.auth);

export default route