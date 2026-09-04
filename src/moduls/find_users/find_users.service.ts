import { CustomError } from "../../helpers/custom-error.ts"
import { findRequest, findUser, findUsers } from "./find_users.repository.ts"

export class FindUsersService {
    findUsers = async (name:string, userId:string) => {
        const me = await findUser(userId)
        if(!me){
            throw new CustomError("user not found", 404)
        }

        const users = await findUsers(name, userId)
        const result = []

        for (const user of users) {
            let relation = "none"
            // verifica que el usuario que esta haciendo la peticion este en los amigos de los usuario que se estan buscando
            const isFriend = me.friends.some(friendId => friendId.toString() === user._id.toString())
            if(isFriend){

                relation = "friend"
            } else {
                // verifica si yo envie la solicitud
                const requestSend = await findRequest(me._id.toString(), user._id.toString())
                if(requestSend){
                    relation = "pendding_sent"
                } else {
                    // verifica si me envio la solicitud de amistad
                    const requestResived = await findRequest(user._id.toString(), me._id.toString())
                    if(requestResived){
                        relation = "pendding_received"
                    }
                }
            }

            result.push({id:user._id.toString(), name:user.name, relation})
        }
        return result
    }
}