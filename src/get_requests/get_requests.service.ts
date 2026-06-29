import { getRequestRepository } from "./get_requests.repository.ts"

export class GetRequestsService {
    getRequest = async (userId:string) => {
        const result = await getRequestRepository(userId)
        console.log(result)
        return result
    }
}