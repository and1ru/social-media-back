import { UsersConnectedService } from "./user_connected.service";
import type { Request, Response, NextFunction } from "express";

export class UsersConnectedController {
    constructor(private service:UsersConnectedService){}

    usersConnected = (req:Request, res:Response, next:NextFunction) => {
        const { userId } = req.params
        if(!userId || typeof userId !== "string"){
            return res.status(400).json({message:"debe tener un id"})
        }
        try {
            const result = this.service.usersConnected(userId)
            return res.status(200).json({message:"got status", result})
        } catch (error) {
            next(error)
        }
    }
}