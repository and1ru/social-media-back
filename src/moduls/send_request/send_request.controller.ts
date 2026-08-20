import { sendRequestSchema } from "./send_request.schema.ts"
import type { NextFunction, Request, Response } from "express"
import { SendRequestService } from "./send_request.service.ts"

export class SendRequestController {
    constructor(private service:SendRequestService){}

    sendRequest = async (req:Request, res:Response, next:NextFunction) => {
        const data = sendRequestSchema.safeParse(req.body)
        const userId = req.user.id
        if(!data.success){
            return next(data.error)
        }
        try {
            const result = await this.service.sendRequest(data.data.receiver, userId)
            return res.status(200).json({message:"se envio la solicitud", result})
        } catch (error) {
            next(error)
        }
    }
}