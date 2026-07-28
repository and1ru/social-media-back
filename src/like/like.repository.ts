import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool"

export const findPost = async (postId:string) => {
    return await myDb.collection("posts").findOne({_id: new ObjectId(postId)})
}

export const findLikeRepository = async (userId:string, postId:string) => {
    const result = await myDb.collection("likes").findOne({userId, postId})
    return result
}

export const deleteLikeRepository = async (likeId:ObjectId) => {
    await myDb.collection("likes").deleteOne({_id: likeId})
}

export const likeRepository = async (userId:string, postId:string) => {
    await myDb.collection("likes").insertOne({userId, postId})
}

export const countLikesPosts = async (postId:string) => {
    const result = await myDb.collection("likes").countDocuments({postId})
    return result
}