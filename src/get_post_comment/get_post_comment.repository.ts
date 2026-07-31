import { myDb } from "../helpers/pool"

export const getComments = async (postId:string) => {
    return await myDb.collection("comments").find({postId}).toArray()
}

export const countComments = async (postId:string) => {
    return await myDb.collection("comments").countDocuments({postId})
}