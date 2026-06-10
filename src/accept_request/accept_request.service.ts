import { acceptRequest } from "./accept_request.repository.ts"

export class AcceptRequestService {
    acceptRequest = async (id:string) => {
        await acceptRequest(id)
        return
    }
}