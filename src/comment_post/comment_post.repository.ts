import { ObjectId } from "mongodb"
import { myDb } from "../helpers/pool"

interface Comment {
    _id: ObjectId,
    userId:string
    comment: string
}

interface Post {
    _id: ObjectId,
    userId: string,
    content: string,
    likes: number,
    comentarios: Comment[]
}

export const commetPostRepository = async (postId:string, userId:string, comment:string) => {
    await myDb.collection<Post>("posts").updateOne(
        {_id: new ObjectId(postId)},
        { $push: { comentarios: { _id: new ObjectId(), userId, comment}}}
    )
}

export const findPost = async (postId:string) => {
    const result = await myDb.collection("posts").findOne({_id: new ObjectId(postId) })
    return result
}