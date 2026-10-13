import { ObjectId } from "mongodb"
import { myDb } from "../../../helpers/pool"

interface request {
    userName:string,
    sender: string, 
    receiver: string,
    createdAt: string,
    status: string
}

export const findRequestById = async (id:string) => {
    return await myDb.collection<request>("friend_requests").findOne({_id: new ObjectId(id)})
}

export const findRequest = async (sender:string, receiver:string) => {
    return await myDb.collection("friend_requests").findOne({sender, receiver})
}