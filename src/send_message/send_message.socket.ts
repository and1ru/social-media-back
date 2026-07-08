import type { Server } from "socket.io";

export function chatSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log(`se conecto: ${socket.data.userId}`);

    socket.emit("saludo-inicio", {
      saludo: "hola",
    });

    socket.on("disconnect", () => {
      console.log("se desconecto el usuario");
    });
  });
}
