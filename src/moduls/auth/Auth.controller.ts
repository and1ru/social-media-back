import type { NextFunction, Request, Response } from "express"
import { CustomError } from "../../helpers/custom-error.ts"
import jwt from 'jsonwebtoken'
import { envs } from "../../helpers/envs.ts"

// codigo que no deberia ir
export class AuthController {
    auth = (req: Request, res: Response, next: NextFunction) => {
        const name = req.user.name
        const userId = req.user.id

        try {
            const result = { name, userId }
            return res.status(200).json({ success: true, message: "authenticated", result })
        } catch (error) {
            return next(error)
        }

    }
}