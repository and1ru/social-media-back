import type { Request, Response } from "express";
import { loginSchema } from "./login.schema.ts";
import { LoginService } from "./login.service.ts";
export class LoginController {
  private service = new LoginService();

  login = async (req: Request, res: Response) => {
    const data = loginSchema.safeParse(req.body);
    if (!data.success) {
      return res.status(401).json({ message: "datos no validos" });
    }

    try {
      const result = await this.service.login(data.data);
      res.status(200).json({ result, message: "login" });
      return;
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "error interno del servidor" });
    }
  };
}
