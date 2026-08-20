import type { Server } from "socket.io";

export const userTyping = (io:Server) => {
    io.on("connection", (socket) => {
        socket.on("typing:start", (data) => {
            const { roomId } = data
            socket.to(roomId).emit("user_typing",{
                isTyping:true
            })
        })

        socket.on("typing:stop", (data) => {
            const { roomId } = data
            socket.to(roomId).emit("user_typing",{
                isTyping:false
            })
        })
    })
}