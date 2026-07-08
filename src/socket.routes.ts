import { Server } from "socket.io";
import { chatFriend } from "./send_message/send_message.socket.ts";
import { AuthTokenSocket } from "./middlewares/authToken.socket.ts";

// crea una funcion que reciba todos los sockets
// para que en el index pueda importar solo esta funcion y se ejecuten el resto
export function socketRoutes(io:Server) {
  AuthTokenSocket(io)
  chatFriend(io)
}