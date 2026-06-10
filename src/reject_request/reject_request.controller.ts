import type { Response, Request } from "express";
import { rejectRequestSchema } from "./reject_request.schema.ts";
import { RejectRequestService } from "./reject_request.service.ts";

export class RejectRequestController {
    private service = new RejectRequestService()

    rejectRequest = async (req:Request, res:Response) => {
        const data = rejectRequestSchema.safeParse(req.body)
        if(!data.success){
            return res.status(401).json({message:"el id es obligatorio"})
        }
        try {
            const result = await this.service.rejectRequest(data.data.id)
            return res.status(200).json({message:"solicitud rechazada", result})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:"error del servidor"})
        }
    }
}