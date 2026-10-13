import { CustomError } from "../../helpers/customError.ts";
import { findRequestById } from "../../shared/repositories/findRequest/findRequest.repository.ts"; 
import { rejectRequest } from "./reject_request.repository.ts";

export class RejectRequestService {
  rejectRequest = async (requestId: string, userId:string) => {
    // verificar que exista la peticion
    const verifyRequest = await findRequestById(requestId);
    if (!verifyRequest) {
      throw new CustomError("no request", 404);
    }

    // verificar que a quien le enviaron la solicitud sea el unico que puede rechazarla
    const verifyUser = verifyRequest.receiver === userId

    if(!verifyUser){
      throw new CustomError("you can not reject this request", 400)
    }

    // rechazar y eliminar la peticion
    await rejectRequest(requestId);
  };
}
