import { ObjectId } from "mongodb"
import { myDb } from "../../helpers/pool"

export const findPost = async (postId:string) => {
    return await myDb.collection("posts").findOne({_id: new ObjectId(postId)})
}

export const findLikeRepository = async (userId:string, postId:string) => {
    return await myDb.collection("likes").findOne({userId, postId})
}

export const countLikesPosts = async (postId:string) => {
    return await myDb.collection("likes").countDocuments({postId})
}