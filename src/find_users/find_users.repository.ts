import { myDb } from "../helpers/pool.ts"

export const findUsers = async (name:string) => {
    return await myDb.collection("users").find({name},{projection:{_id:1, name:1}}).toArray()
}