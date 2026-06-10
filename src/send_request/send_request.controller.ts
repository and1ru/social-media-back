import { sendRequestSchema } from "./send_request.schema.ts"
import type { Request, Response } from "express"
import { SendRequestService } from "./send_request.service.ts"

export class SendRequestController {
    private service = new SendRequestService()

    sendRequest = async (req:Request, res:Response) => {
        const data = sendRequestSchema.safeParse(req.body)
        if(!data.success){
            return res.status(401).json({message:"error en datos"})
        }
        try {
            const result = await this.service.sendRequest(data.data)
            return res.status(200).json({message:"se envio la solicitud", result})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"error del servidor"})
        }
    }
}