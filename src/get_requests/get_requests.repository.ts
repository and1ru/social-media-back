import { myDb } from "../helpers/pool.ts"

export const getRequestRepository = async (userId:string) => {
    return await myDb.collection("friend_requests").find({receiver: userId}).toArray()
}