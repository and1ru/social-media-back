import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool"

export const getPostRepository = async (postId:string) => {
    const result = await myDb.collection("posts").findOne({_id: new ObjectId(postId)})
    return result
}

export const deletePostRepository = async (postId:string) => {
    await myDb.collection("posts").deleteOne({_id: new ObjectId(postId)})
}