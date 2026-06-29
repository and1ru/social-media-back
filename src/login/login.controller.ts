import type { NextFunction, Request, Response } from "express";
import { loginSchema } from "./login.schema.ts";
import { LoginService } from "./login.service.ts";
export class LoginController {
  private service = new LoginService();

  login = async (req: Request, res: Response, next: NextFunction) => {
    const data = loginSchema.safeParse(req.body);
    if (!data.success) return next(data.error)

    try {
      const result = await this.service.login(data.data);
      
      res.cookie(
        "token",
        result,
        {
          maxAge: 1000 * 60 * 60, // 1h
          httpOnly: true,
          secure: false
        }
      )
      return res.status(200).json({ success: true});
    } catch (error) {
      next(error)
    }
  };
}
