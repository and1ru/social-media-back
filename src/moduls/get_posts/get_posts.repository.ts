import { myDb } from "../../helpers/pool.ts"

export const getPosts = async () => {
    return await myDb.collection("posts").find().toArray()
}