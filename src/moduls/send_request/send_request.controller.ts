import { sendRequestSchema } from "./send_request.schema.ts"
import type { NextFunction, Request, Response } from "express"
import { SendRequestService } from "./send_request.service.ts"

export class SendRequestController {
    constructor(private service:SendRequestService){}

    sendRequest = async (req:Request, res:Response, next:NextFunction) => {
        const data = sendRequestSchema.safeParse(req.body)
        const userId = req.user.id
        const userName = req.user.name

        if(!data.success){
            return next(data.error)
        }
        
        try {
            const { receiver } = data.data
            const result = await this.service.sendRequest(receiver, userId, userName)
            return res.status(200).json({message:"se envio la solicitud", result})
        } catch (error) {
            next(error)
        }
    }
}