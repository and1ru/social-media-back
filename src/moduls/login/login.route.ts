import { Router } from "express";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { rateLimit } from "../../middlewares/rateLimit/rateLimit";
import { envs } from "../../helpers/envs";

const service = new LoginService();
const controller = new LoginController(service);

const route = Router();

const test = envs.node_env === "test" ? rateLimit(5, 1000 * 60) : rateLimit(2, 1000 * 60)

route.post("/login", test, controller.login);

export default route;