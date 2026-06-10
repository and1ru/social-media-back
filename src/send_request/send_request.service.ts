import { sendRequest } from "./send_request.repository.ts"
import type { sendRequestType } from "./send_request.schema.ts"

export class SendRequestService {
    sendRequest = async (request:sendRequestType) => {
        // verificar que la solicitud ya no este creada
        // verificar que los ids existan
        
        const newRequest = {
            ...request,
            createdAt: new Date(),
            status: "pending"
        }

        const result = await sendRequest(newRequest)
        return result
    }
}