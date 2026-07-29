import { myDb } from "../helpers/pool"

export const getComments = async (postId:string) => {
    const result = await myDb.collection("comments").find({postId}).toArray()
    return result
}

export const countComments = async (postId:string) => {
    const result = await myDb.collection("comments").countDocuments({postId})
    return result
}