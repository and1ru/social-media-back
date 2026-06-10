import type { Request, Response } from "express"
import { acceptRequestSchema } from "./accept_request.schema.ts"
import { AcceptRequestService } from "./accept_request.service.ts"

export class AcceptRequestController {
    private service = new AcceptRequestService()
    acceptRequest = async (req:Request, res:Response) => {
        const data = acceptRequestSchema.safeParse(req.body)
        if(!data.success){
            return res.status(401).json({message: "el id es obligatorio"})
        }
        try {
            await this.service.acceptRequest(data.data.id)
            return res.status(200).json({message:"solicitud aceptada"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"error interno del servidor"})
        }
    }
}