import type { NextFunction, Request, Response } from "express";
import { GetRequestsService } from "./get_requests.service.ts";

export class GetRequestsController {
    constructor(private service:GetRequestsService){}
    getRequest = async (req:Request, res:Response, next:NextFunction) => {
        const userId = req.user.id
        try {
            const result = await this.service.getRequest(userId)
            return res.status(200).json({message:"got friend requests", result})
        } catch (error) {
            return next(error)
        }
    }
}