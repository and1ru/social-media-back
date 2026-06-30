import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool.ts"

export const sendRequest = async (request:any) => {
    return await myDb.collection("friend_requests").insertOne({
        sender: request.sender, 
        receiver: request.receiver,
        createdAt: request.createdAt,
        status: request.status
    })
}

export const verifyRelation = async (id:string) => {
    return await myDb.collection("users").findOne({_id: new ObjectId(id)})
}

export const verifyRequestRepository = async (receiver:string, sender:string) => {
    return await myDb.collection("friend_requests").findOne({receiver, sender})
}