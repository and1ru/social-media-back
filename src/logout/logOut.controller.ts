import type { Request, Response } from "express"
export class LogOutController {
    logOut = (req:Request,res:Response) => {
        res.clearCookie("token")
        return res.status(200).json({status:true, message:"sesion cerrada correctamente"})
    }
}   