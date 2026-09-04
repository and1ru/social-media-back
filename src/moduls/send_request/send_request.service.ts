import { ObjectId } from "mongodb"
import { CustomError } from "../../helpers/custom-error.ts"
import { sendRequest, verifyRelation, verifyRequestRepository } from "./send_request.repository.ts"

export class SendRequestService {
    sendRequest = async (receiver:string, sender:string, userName:string) => {

        // verificar que no se envie la solicitud asi mismo
        if(receiver === sender){
            throw new CustomError("no se puede enviar la solicitud asi mismo", 400);
        }

        // verificar si son amigos
        // 1. obtiene el usuario
        const user = await verifyRelation(sender)

        // 2. si no existe el usuario lo retorna
        if(!user){
            throw new CustomError("no hay usuario con ese id", 400)
        }

        // 3. obtiene los amigos del usuario
        const friends = user.friends

        // 4. busca si en el array de amigos existe un amigo con el mismo id que al que le estoy enviando la solicitud
        // some retorna true / false
        const filtrar = friends.some((friend:any) => {
            return friend.toString() === receiver 
        })

        if(filtrar){
            throw new CustomError("ya son amigos", 400)
        }

        // verificar si la solicitud ya fue enviada
        // 1. obtiene la request
        const verifyRequest = await verifyRequestRepository(receiver, sender)

        // 2. si hay algo retornar un error
        if(verifyRequest){
            throw new CustomError("ya se ha enviado la peticion", 400)
        }

        const newRequest = {
            userName,
            receiver,
            sender,
            createdAt: new Date(),
            status: "pending"
        }

        const result = await sendRequest(newRequest)
        return result
    }
}