import { ObjectId } from "mongodb"
import { acceptRequest, addFriends } from "./accept_request.repository.ts"

export class AcceptRequestService {
    acceptRequest = async (id:string) => {
        const request = await acceptRequest(id)
        if(!request){
            throw new Error("no hay peticion con ese id")
        }

        const senderId = new ObjectId(request.sender)
        const receiverId = new ObjectId(request.receiver)

        await addFriends(receiverId, senderId, id)
    }
}