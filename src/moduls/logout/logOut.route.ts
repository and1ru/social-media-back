import { Router } from "express";
import { LogOutController } from "./logOut.controller";

const logOut = new LogOutController();
const route = Router()

// Definición de rutas
route.post("/log-out", logOut.logOut);

export default route