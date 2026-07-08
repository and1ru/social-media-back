import type { Server } from "socket.io";

export function chatSocket(io: Server) {
    io.use((socket, next) => {
        const token = socket.handshake.headers.cookie
        console.log(token)

        next()
    })
  io.on("connection", (socket) => {
    console.log(`se conecto: ${socket.id}`);

    socket.emit("saludo-inicio", {
      saludo: "hola",
    });

    socket.on("disconnect", () => {
      console.log("se desconecto el usuario");
    });
  });
}
