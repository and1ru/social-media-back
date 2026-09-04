import { getRequestRepository } from "./get_requests.repository.ts"

export class GetRequestsService {
    getRequest = async (userId:string) => {
        return await getRequestRepository(userId)
    }
}