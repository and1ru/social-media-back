import { CustomError } from "../../helpers/customError.ts";
import { findRequestById } from "../../shared/repositories/findRequest.repository.ts";
import { rejectRequest } from "./reject_request.repository.ts";

export class RejectRequestService {
  rejectRequest = async (requestId: string) => {
    // verificar que exista la peticion
    const verifyRequest = await findRequestById(requestId);
    if (!verifyRequest) {
      throw new CustomError("no friend request found", 404);
    }

    // rechazar y eliminar la peticion
    await rejectRequest(requestId);
  };
}
