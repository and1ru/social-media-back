import { CustomError } from "../../helpers/custom-error.ts";
import { findRequest, rejectRequest } from "./reject_request.repository.ts"

export class RejectRequestService {
    rejectRequest = async (id:string) => {
        // verificar que exista la peticion
        const verifyRequest = await findRequest(id)
        if(!verifyRequest){
            throw new CustomError("no hay una peticion de amistad con ese id",404);
        }
        // rechazar y eliminar la peticion
        await rejectRequest(id)
    }
}