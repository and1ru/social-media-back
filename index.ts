import { createServer } from "http"
import { Server } from "socket.io"
import { app } from "./src/app"
import { socketRoutes } from "./src/socket.routes"

const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

socketRoutes(io)

httpServer.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000")
})