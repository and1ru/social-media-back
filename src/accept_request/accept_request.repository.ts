import { myDb } from "../helpers/pool.ts"
import { ObjectId } from "mongodb"

export const acceptRequest = async (id:string) => {
    const request = await myDb.collection("friend_requests").findOne({_id: new ObjectId(id)})
    if(!request){
        throw new Error("no hay peticion con ese id")
    }

    // si se obtuviera normalmente seria solo un string y el id no es un string es un ObjectId
    const senderId = new ObjectId(request.sender)
    const receiverId = new ObjectId(request.receiver)

    // agregar a quien recive la solicitud a los amigos
    await myDb.collection("users").updateOne({_id: receiverId}, {
        $addToSet: { friends: senderId}
    })

    // agregar a quien envio la solicitud a los amigos
    await myDb.collection("users").updateOne({_id: senderId}, {
        $addToSet: { friends: receiverId}
    })

    await myDb.collection("friend_requests").deleteOne({_id: new ObjectId(id)})
    return
}