import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool.ts"

interface getMessage {
    _id:string
}

export const verifyRelation = async (id:string) => {
    return await myDb.collection("users").findOne({_id: new ObjectId(id)})
}

export const getMessagesRepository = async (id:string) => {
    return await myDb.collection<getMessage>("messages").find({chatId:id}).toArray()
}