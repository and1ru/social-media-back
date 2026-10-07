import { Router } from "express";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { rateLimit } from "../../middlewares/rateLimit";

const service = new LoginService();
const controller = new LoginController(service);

const route = Router();

route.post("/login", rateLimit(2, 1000 * 60), controller.login);

export default route;