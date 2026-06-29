import type { NextFunction, Request, Response } from "express"
import { acceptRequestSchema } from "./accept_request.schema.ts"
import { AcceptRequestService } from "./accept_request.service.ts"

export class AcceptRequestController {
    private service = new AcceptRequestService()
    acceptRequest = async (req:Request, res:Response, next:NextFunction) => {
        const data = acceptRequestSchema.safeParse(req.body)
        if(!data.success){
            return next(data.error)
        }
        try {
            await this.service.acceptRequest(data.data.id)
            return res.status(200).json({message:"solicitud aceptada"})
        } catch (error) {
            next(error)
        }
    }
}