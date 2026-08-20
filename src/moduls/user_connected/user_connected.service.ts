import { connectedUsers } from "../../helpers/connected-users"

export class UsersConnectedService {
    usersConnected = (userId:string):boolean => {
        return connectedUsers.has(userId)
    }
}