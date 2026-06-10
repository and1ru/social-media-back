import { myDb } from "../helpers/pool.ts"
import type { postType } from "./post.schema.ts"

export const createPost = async (post:postType) => {
    return await myDb.collection("posts").insertOne({post})
}