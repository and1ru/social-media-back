import type { NextFunction, Request, Response } from "express"
import { CustomError } from "../helpers/custom-error.ts"
import jwt from 'jsonwebtoken'
import { envs } from "../helpers/envs.ts"

export class AuthController {
    auth = (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.token
        if (!token) {
            throw new CustomError("no hay token", 400)
        }

        try {
            const verifyToken = jwt.verify(token, envs.jwt_secret)

            if (!verifyToken) {
                throw new CustomError("token no valido", 400)
            }

            return res.status(200).json({ success: true, message: "token valido" })
        } catch (error) {
            console.log(error)
            next(error)
        }

    }
}