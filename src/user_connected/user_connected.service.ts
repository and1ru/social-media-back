import { connectedUsers } from "../helpers/connected-users"

export class UsersConnectedService {
    usersConnected = (userId:string):boolean => {
        const status = connectedUsers.has(userId)

        return status
    }
}