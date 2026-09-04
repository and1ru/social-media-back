import type { NextFunction, Request, Response } from "express"
import { acceptRequestSchema } from "./accept_request.schema.ts"
import { AcceptRequestService } from "./accept_request.service.ts"

export class AcceptRequestController {
    constructor (private service:AcceptRequestService){}
    acceptRequest = async (req:Request, res:Response, next:NextFunction) => {
        const data = acceptRequestSchema.safeParse(req.body)
        if(!data.success){
            return next(data.error)
        }
        try {
            const { id } = data.data
            await this.service.acceptRequest(id)
            return res.status(200).json({message:"solicitud aceptada"})
        } catch (error) {
            next(error)
        }
    }
}