import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool"

export const postByIdRepository = async (postId:string) => {
    const result = await myDb.collection("posts").findOne({_id: new ObjectId(postId)})
    return result
}