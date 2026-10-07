import type { Request, Response } from "express"
export class LogOutController {
    logOut = (_req:Request,res:Response) => {
        // agregar configuracion de las cookies
        res.clearCookie("token", {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
          secure: false
        })
        return res.status(200).json({status:true, message:"sesion cerrada correctamente"})
    }
}