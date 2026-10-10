import { ObjectId } from "mongodb"
import { myDb } from "../../helpers/pool"

export const deleteLikeRepository = async (likeId:ObjectId) => {
    await myDb.collection("likes").deleteOne({_id: likeId})
}

export const likeRepository = async (userId:string, postId:string) => {
    await myDb.collection("likes").insertOne({userId, postId})
}