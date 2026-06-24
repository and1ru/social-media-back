import type { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import { CustomError } from "../helpers/custom-error.ts"
import { ZodError } from "zod"

export const errorMiddleware = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
    // otros errores
    if (err instanceof CustomError) {
        return res.status(err.status).json({ success: false, message: err.message })
    }

    // ver si es un error de jsonwebtoken
    if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ success: false, message: "token no valido" })
    }

    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ success: false, message: "El token de sesión ha expirado" })
    }

    // si es un error de tipado de zod
    if (err instanceof ZodError) {
        return res.status(400).json({ success: false, message: "error en los campos" })
    }

    // error de servidor
    return res.status(500).json({ success: false, message: "error del servidor" })
}