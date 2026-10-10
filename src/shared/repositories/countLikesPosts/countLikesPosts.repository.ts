import { myDb } from "../../../helpers/pool"

export const countLikesPosts = async (postId:string) => {
    return await myDb.collection("likes").countDocuments({postId})
}