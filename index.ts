import express from 'express'
import cors from 'cors'
import { routes } from './src/app.routes.ts'
import { errorMiddleware } from './src/middlewares/error.middleware.ts'
import cookieParser from 'cookie-parser'
import { Server } from "socket.io";
import {createServer} from 'http'
import { socketRoutes } from './src/socket.routes.ts'

const app = express()

app.use(cors({ origin: "http://localhost:5173", credentials:true }))
app.use(express.json())
app.use(cookieParser())
app.use(routes) 

//
const httpServer = createServer(app)
export const io = new Server(httpServer, {cors:{origin:"http://localhost:5173", credentials:true}})

socketRoutes(io)

// middleware de errores (SIEMPRE AL FINAL)
app.use(errorMiddleware);

// se inicia con httpServer para que tambien se pueda iniciar el servidor de socket
httpServer.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000")
})