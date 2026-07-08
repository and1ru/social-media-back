import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool.ts"

export const verifyRelation = async (id:string) => {
    return await myDb.collection("users").findOne({_id: new ObjectId(id)})
}

interface getMessage {
    _id:string
}

export const getMessagesRepository = async (id:string) => {
    const result = await myDb.collection<getMessage>("messages").find({chatId:id}).toArray()
    return result
}