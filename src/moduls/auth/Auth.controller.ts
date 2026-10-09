import type { Request, Response } from "express"

export class AuthController {
    auth = (req: Request, res: Response) => {
        const name = req.user.name.trim()
        const userId = req.user.id
        const result = { name, userId }
        return res.status(200).json({ success: true, message: "authenticated", result })
    }
}