import { myDb } from "../helpers/pool.ts"

export const findUsers = async (name:string) => {
    const result = await myDb.collection("users").find({},{projection:{_id:1, name:1}}).toArray()
    return result
}