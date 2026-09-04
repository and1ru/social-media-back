import { ObjectId } from "mongodb"
import { myDb } from "../../helpers/pool"

export const commetPostRepository = async (postId:string, userId:string, comment:string, userName:string) => {
    await myDb.collection("comments").insertOne({postId, userId, comment, userName})
}

export const findPost = async (postId:string) => {
    return await myDb.collection("posts").findOne({_id: new ObjectId(postId)})
}