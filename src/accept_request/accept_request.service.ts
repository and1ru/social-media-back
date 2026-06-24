import { acceptRequest } from "./accept_request.repository.ts"

export class AcceptRequestService {
    acceptRequest = async (id:string) => {
        return await acceptRequest(id)
    }
}