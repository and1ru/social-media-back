import type { Response, Request, NextFunction } from "express";
import { rejectRequestSchema } from "./reject_request.schema.ts";
import { RejectRequestService } from "./reject_request.service.ts";

export class RejectRequestController {
    private service = new RejectRequestService()

    rejectRequest = async (req:Request, res:Response, next:NextFunction) => {
        const data = rejectRequestSchema.safeParse(req.body)
        if(!data.success){
            return next(data.error)
        }
        try {
            const result = await this.service.rejectRequest(data.data.id)
            return res.status(200).json({message:"solicitud rechazada", result})
        } catch (error) {
            next(error)
        }
    }
}