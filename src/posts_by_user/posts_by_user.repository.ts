import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool"

export const postByUserRepository = async (userId:string) => {
    const result = await myDb.collection("posts").find({userId}).toArray()
    return result
}

export const verifyUser = async (userId:string) => {
    const result = await myDb.collection("users").findOne({_id: new ObjectId(userId)})
    return result
}