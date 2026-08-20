import type { NextFunction, Request, Response } from "express";
import { loginSchema } from "./login.schema.ts";
import { LoginService } from "./login.service.ts";

export class LoginController {
  constructor(private service:LoginService){}

  login = async (req: Request, res: Response, next: NextFunction) => {
    const data = loginSchema.safeParse(req.body);
    if (!data.success) return next(data.error)

    try {
      const result = await this.service.login(data.data);

      const { name, token, userId } = result
      
      res.cookie(
        "token",
        token,
        {
          maxAge: 1000 * 60 * 60, // 1h
          httpOnly: true,
          secure: false
        }
      )

      return res.status(200).json({ name, userId });
    } catch (error) {
      next(error)
    }
  };
}
