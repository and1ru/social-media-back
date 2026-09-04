import type { NextFunction, Request, Response } from "express"; 
import { friendsSchema } from "./friends.schema.ts";
import { FriendsService } from "./friends.service.ts";

export class FriendsController {
    
    constructor(private service:FriendsService){}

    friends = async (req:Request, res:Response, next:NextFunction) => {
        const userId = req.user.id

        try {
            const result = await this.service.friends(userId)
            return res.status(200).json({message:"se obtuvieron los amigos", result})
        } catch (error) {
            next(error)
        }
    }
}