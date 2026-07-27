import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool"

export const getComments = async (postId:string) => {
    const objId = new ObjectId(postId)
    const result = await myDb.collection("posts").findOne({_id:objId})
    return result
}