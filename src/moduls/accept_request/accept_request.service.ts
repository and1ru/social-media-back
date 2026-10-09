import { ObjectId } from "mongodb";
import { addFriends } from "./accept_request.repository.ts";
import { CustomError } from "../../helpers/customError.ts";
import { findRequestById } from "../../shared/repositories/findRequest.repository.ts";

export class AcceptRequestService {
  acceptRequest = async (id: string) => {
    const request = await findRequestById(id);
    if (!request) {
      throw new CustomError("no request", 404);
    }

    const senderId = new ObjectId(request.sender);
    const receiverId = new ObjectId(request.receiver);

    await addFriends(receiverId, senderId, id);
  };
}