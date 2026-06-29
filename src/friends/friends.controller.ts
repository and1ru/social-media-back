import type { NextFunction, Request, Response } from "express"; 
import { friendsSchema } from "./friends.schema.ts";
import { FriendsService } from "./friends.service.ts";

export class FriendsController {
    private service = new FriendsService()

    friends = async (req:Request, res:Response, next:NextFunction) => {
        const user = req.user

        try {
            const result = await this.service.friends(user.id)
            return res.status(200).json({message:"se obtuvieron los amigos", result})
        } catch (error) {
            next(error)
        }
    }
}