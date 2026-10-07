import { myDb } from "../../helpers/pool"

export const commetPostRepository = async (postId: string, userId: string, comment: string, userName: string) => {
    await myDb.collection("comments").insertOne({ postId, userId, comment, userName })
}