import type { Response, Request, NextFunction } from "express";
import { rejectRequestSchema } from "./reject_request.schema.ts";
import { RejectRequestService } from "./reject_request.service.ts";

export class RejectRequestController {
    constructor(private service: RejectRequestService){}
    rejectRequest = async (req:Request, res:Response, next:NextFunction) => {
        const userId = req.user.id
        const data = rejectRequestSchema.safeParse(req.body)

        if(!data.success){
            return next(data.error)
        }

        try {
            await this.service.rejectRequest(data.data.id, userId)
            return res.status(200).json({message:"request rejected", success:true})
        } catch (error) {
            return next(error)
        }
    }
}