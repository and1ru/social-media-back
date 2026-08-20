import { myDb } from "../../helpers/pool.ts"
import { ObjectId } from "mongodb"

export const findRequest = async (id:string) => {
    return await myDb.collection("friend_requests").findOne({_id: new ObjectId(id)})
}

export const rejectRequest = async (id:string) => {
    return await myDb.collection("friend_requests").deleteOne({_id: new ObjectId(id)})
}