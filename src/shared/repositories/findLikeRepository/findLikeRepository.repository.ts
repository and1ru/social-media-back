import { myDb } from "../../../helpers/pool"

export const findLikeRepository = async (userId:string, postId:string) => {
    return await myDb.collection("likes").findOne({ userId, postId })
}