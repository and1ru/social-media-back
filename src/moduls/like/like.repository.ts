import { ObjectId } from "mongodb"
import { myDb } from "../../helpers/pool"

export const findLikeRepository = async (userId:string, postId:string) => {
    return await myDb.collection("likes").findOne({userId, postId})
}

export const deleteLikeRepository = async (likeId:ObjectId) => {
    await myDb.collection("likes").deleteOne({_id: likeId})
}

export const likeRepository = async (userId:string, postId:string) => {
    await myDb.collection("likes").insertOne({userId, postId})
}

export const countLikesPosts = async (postId:string) => {
    return await myDb.collection("likes").countDocuments({postId})
}