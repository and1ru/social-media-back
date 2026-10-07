import { myDb } from "../../helpers/pool.ts"
import { ObjectId } from "mongodb"

export const addFriends = async (receiverId:ObjectId, senderId:ObjectId, requestId:string) => {
    await myDb.collection("users").updateOne({_id: receiverId}, {$addToSet: { friends: senderId}})

    await myDb.collection("users").updateOne({_id: senderId}, {$addToSet: { friends: receiverId}})

    await myDb.collection("friend_requests").deleteOne({_id: new ObjectId(requestId)})
}