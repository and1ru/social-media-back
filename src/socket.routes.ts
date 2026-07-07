import { Server } from "socket.io";
import { chatSocket } from "./send_message/send_message.controller.ts";

// crea una funcion que reciba todos los sockets
// para que en el index pueda importar solo esta funcion y se ejecuten el resto
export function socketRoutes(io:Server) {
    chatSocket(io)
}