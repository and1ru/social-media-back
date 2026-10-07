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
            await this.service.sendRequest(receiver, userId, userName)
            return res.status(201).json({ message:"friend request sended", success:true })
        } catch (error) {
            return next(error)
        }
    }
}