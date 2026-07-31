import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool"

export const getPost = async (postId:string) => {
    return await myDb.collection("posts").findOne({_id: new ObjectId(postId)})
}

export const deletePostRepository = async (postId:string) => {
    await myDb.collection("posts").deleteOne({_id: new ObjectId(postId)})
}