import type { Server } from "socket.io";
import { parseCookie } from "cookie";
import jwt from 'jsonwebtoken'
import { CustomError } from "../helpers/custom-error.ts";
import { envs } from "../helpers/envs.ts";

interface payload {
  id: string,
  name: string
}

// esta es una funcion que verifica que haya el token y que sea correcto
export const AuthTokenSocket = (io:Server) => {
    io.use((socket, next) => {
    const cookies = parseCookie(socket.handshake.headers.cookie ?? "")
    const token = cookies.token
    console.log(`token: ${token}`)

    // verificar que haya token
    if (!token) {
      return next(new CustomError("no token", 403))
    }

    // verificar que el token sea valido
    const verifyToken = jwt.verify(token, envs.jwt_secret) as payload

    if (!verifyToken) {
      return next(new CustomError("token no valido", 403))
    }

    socket.data.userId = verifyToken.id
    console.log(`id: ${socket.data.userId}`)
    next()
  })
}