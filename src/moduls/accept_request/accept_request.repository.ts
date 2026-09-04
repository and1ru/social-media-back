import { myDb } from "../../helpers/pool.ts"
import { ObjectId } from "mongodb"

// en este archivo hay logica
// deberia ir en el service

export const acceptRequest = async (id:string) => {
    return await myDb.collection("friend_requests").findOne({_id: new ObjectId(id)})
}

export const addFriends = async (receiverId:ObjectId, senderId:ObjectId, id:string) => {
    await myDb.collection("users").updateOne({_id: receiverId}, {$addToSet: { friends: senderId}})

    await myDb.collection("users").updateOne({_id: senderId}, {$addToSet: { friends: receiverId}})

    await myDb.collection("friend_requests").deleteOne({_id: new ObjectId(id)})
}