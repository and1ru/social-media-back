import { ObjectId } from "mongodb"
import { CustomError } from "../../helpers/custom-error"
import { getMessagesRepository, verifyRelation } from "./get_message.repository.ts"

export class GetMessagesService {
    getMessage = async (userId:string, friendId:string) => {
        const user = await verifyRelation(userId)
        if(!user){
            throw new CustomError("no se encontro un usuario con ese id", 400)
        }

        const friends:ObjectId[] = user.friends

        // verificar que el friendId este en el array de amigos
        const verify = friends.some((friend) => friend.toString() === friendId)
        // si no esta lanza un error de que no son amigos
        if(!verify){
            throw new CustomError("no son amigos", 400)
        }

        // si esta hacer un sort con los ids para encontrar el chat y sus mensajes
        const ids = [userId, friendId]
        const chat = ids.sort().join("-")    
        const result = await getMessagesRepository(chat)

        return result
    }
}