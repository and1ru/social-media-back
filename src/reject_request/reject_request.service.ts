import { findRequest, rejectRequest } from "./reject_request.repository.ts"

export class RejectRequestService {
    rejectRequest = async (id:string) => {
        // verificar que exista la peticion
        const verifyRequest = await findRequest(id)
        console.log(verifyRequest)
        if(!verifyRequest){
            throw new Error("no hay una peticion de amistad con ese id");
        }
        // rechazar la peticion
        const result = await rejectRequest(id)
        // eliminar la peticion

        return result
    }
}