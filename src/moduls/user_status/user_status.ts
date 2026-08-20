import type { Server } from "socket.io";
import { connectedUsers } from "../../helpers/connected-users";

export const userStatus = (io: Server) => {
    // primer tipado es la clave y el segundo es el valor

    io.on("connection", (socket) => {
        const userId = socket.data.userId
        connectedUsers.set(userId, socket.id);

        console.log(connectedUsers)

        io.emit("user_status", {
            userId,
            connected: true
        })

        socket.on("disconnect", () => {
            connectedUsers.delete(userId)
            io.emit("user_status", {
                userId,
                connected: false
            })
        })
    })
}