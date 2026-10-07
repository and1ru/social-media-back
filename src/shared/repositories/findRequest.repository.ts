import { myDb } from "../../helpers/pool.ts"
import { ObjectId } from "mongodb"

export const findRequestById = async (id:string) => {
    return await myDb.collection("friend_requests").findOne({_id: new ObjectId(id)})
}

export const findRequest = async (sender:string, receiver:string) => {
    return await myDb.collection("friend_requests").findOne({sender, receiver})
}