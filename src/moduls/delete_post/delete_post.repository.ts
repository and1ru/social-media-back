import { ObjectId } from "mongodb"
import { myDb } from "../../helpers/pool"

export const deletePostRepository = async (postId: string) => {
    await myDb.collection("posts").deleteOne({ _id: new ObjectId(postId) })
}