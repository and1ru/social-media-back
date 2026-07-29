import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool"

export const commetPostRepository = async (postId:string, userId:string, comment:string) => {
    await myDb.collection("comments").insertOne({postId, userId, comment})
}

export const findPost = async (postId:string) => {
    const result = await myDb.collection("posts").findOne({_id: new ObjectId(postId) })
    return result
}