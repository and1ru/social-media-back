import type { Request, Response } from "express"
export class LogOutController {
    logOut = (req:Request,res:Response) => {
        // agregar configuracion de las cookies
        res.clearCookie("token",{
            
        })
        return res.status(200).json({status:true, message:"sesion cerrada correctamente"})
    }
}