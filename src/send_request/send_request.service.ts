import { sendRequest } from "./send_request.repository.ts"

export class SendRequestService {
    sendRequest = async (receiver:string, sender:string) => {
        // verificar que la solicitud ya no este creada
        // verificar que los ids existan
        
        const newRequest = {
            receiver,
            sender,
            createdAt: new Date(),
            status: "pending"
        }

        const result = await sendRequest(newRequest)
        return result
    }
}