import type { Response, Request, NextFunction } from "express";
import { rejectRequestSchema } from "./reject_request.schema.ts";
import { RejectRequestService } from "./reject_request.service.ts";

export class RejectRequestController {
    constructor(private service: RejectRequestService){}
    rejectRequest = async (req:Request, res:Response, next:NextFunction) => {
        const data = rejectRequestSchema.safeParse(req.body)
        if(!data.success){
            return next(data.error)
        }
        try {
            const { id } = data.data
            const result = await this.service.rejectRequest(id)
            return res.status(200).json({message:"solicitud rechazada", result})
        } catch (error) {
            next(error)
        }
    }
}