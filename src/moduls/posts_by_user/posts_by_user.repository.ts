import { ObjectId } from "mongodb"
import { myDb } from "../../helpers/pool"

export const postByUserRepository = async (userId:string) => {
    return await myDb.collection("posts").find({userId}).toArray()
}

export const verifyUser = async (userId:string) => {
    return await myDb.collection("users").findOne({_id: new ObjectId(userId)})
}