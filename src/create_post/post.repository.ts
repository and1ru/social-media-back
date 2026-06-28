import { myDb } from "../helpers/pool.ts"
import type { postType } from "./post.schema.ts"

export const createPost = async (post:any) => {
    return await myDb.collection("posts").insertOne({...post})
}